import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const TS_EXTENSIONS = new Set(['.ts', '.tsx']);
const SQL_KINDS = new Set([
  'function',
  'materialized view',
  'policy',
  'procedure',
  'table',
  'trigger',
  'type',
  'view',
]);

function normalizePath(value) {
  return value.split(path.sep).join('/');
}

function lineNumberAt(text, index) {
  let line = 1;
  for (let cursor = 0; cursor < index; cursor += 1) {
    if (text.charCodeAt(cursor) === 10) line += 1;
  }
  return line;
}

function compact(value, limit = 180) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length <= limit ? normalized : `${normalized.slice(0, limit - 1)}…`;
}

function hasExportModifier(ts, node) {
  return Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function declarationKind(ts, statement) {
  if (ts.isFunctionDeclaration(statement)) return 'fn';
  if (ts.isClassDeclaration(statement)) return 'class';
  if (ts.isInterfaceDeclaration(statement)) return 'interface';
  if (ts.isTypeAliasDeclaration(statement)) return 'type';
  if (ts.isEnumDeclaration(statement)) return 'enum';
  return 'export';
}

function namedDeclarationSignature(ts, statement, sourceFile) {
  const name = statement.name?.getText(sourceFile) ?? 'default';

  if (ts.isFunctionDeclaration(statement)) {
    const parameters = statement.parameters.map((parameter) => compact(parameter.getText(sourceFile), 80));
    const returnType = statement.type ? `: ${compact(statement.type.getText(sourceFile), 80)}` : '';
    return `${name}(${parameters.join(', ')})${returnType}`;
  }

  if (ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement)) {
    const heritage = statement.heritageClauses
      ?.map((clause) => compact(clause.getText(sourceFile), 100))
      .join(' ');
    return heritage ? `${name} ${heritage}` : name;
  }

  return name;
}

function bindingNames(ts, name) {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap((element) =>
    ts.isOmittedExpression(element) ? [] : bindingNames(ts, element.name),
  );
}

export function extractTypeScriptFile(ts, sourceText, relativePath) {
  const scriptKind = relativePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(relativePath, sourceText, ts.ScriptTarget.Latest, true, scriptKind);
  const symbols = [];
  const dependencies = [];

  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const specifier = statement.moduleSpecifier.text;
      if (specifier.startsWith('.')) dependencies.push(specifier);
      continue;
    }

    if (ts.isExportDeclaration(statement)) {
      const specifier = statement.moduleSpecifier;
      if (specifier && ts.isStringLiteral(specifier) && specifier.text.startsWith('.')) {
        dependencies.push(specifier.text);
      }
      const names = statement.exportClause && ts.isNamedExports(statement.exportClause)
        ? statement.exportClause.elements.map((element) => element.name.text)
        : ['*'];
      for (const name of names) {
        symbols.push({
          kind: 're-export',
          name,
          signature: name,
          line: sourceFile.getLineAndCharacterOfPosition(statement.getStart(sourceFile)).line + 1,
        });
      }
      continue;
    }

    if (ts.isExportAssignment(statement)) {
      const exportedName = compact(statement.expression.getText(sourceFile), 80);
      if (!symbols.some((symbol) => symbol.name === exportedName)) {
        symbols.push({
          kind: 'default',
          name: `default=${exportedName}`,
          signature: exportedName,
          line: sourceFile.getLineAndCharacterOfPosition(statement.getStart(sourceFile)).line + 1,
        });
      }
      continue;
    }

    if (!hasExportModifier(ts, statement)) continue;
    const line = sourceFile.getLineAndCharacterOfPosition(statement.getStart(sourceFile)).line + 1;

    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        const names = bindingNames(ts, declaration.name);
        for (const name of names) {
          const type = declaration.type ? `: ${compact(declaration.type.getText(sourceFile), 100)}` : '';
          symbols.push({ kind: 'const', name, signature: `${name}${type}`, line });
        }
      }
      continue;
    }

    if (
      ts.isFunctionDeclaration(statement)
      || ts.isClassDeclaration(statement)
      || ts.isInterfaceDeclaration(statement)
      || ts.isTypeAliasDeclaration(statement)
      || ts.isEnumDeclaration(statement)
    ) {
      const name = statement.name?.getText(sourceFile) ?? 'default';
      symbols.push({
        kind: declarationKind(ts, statement),
        name,
        signature: namedDeclarationSignature(ts, statement, sourceFile),
        line,
      });
    }
  }

  return {
    path: normalizePath(relativePath),
    symbols,
    dependencies: [...new Set(dependencies)].sort(),
  };
}

function relationFromSqlTail(kind, tail) {
  if (kind !== 'trigger' && kind !== 'policy') return null;
  const match = tail.match(/\bON\s+((?:"[^"]+"|[A-Za-z_][\w$]*)(?:\s*\.\s*(?:"[^"]+"|[A-Za-z_][\w$]*))?)/i);
  return match ? match[1].replace(/\s+/g, '') : null;
}

function functionSignature(sourceText, startIndex, fallbackName) {
  const openIndex = sourceText.indexOf('(', startIndex);
  if (openIndex === -1) return fallbackName;

  let depth = 0;
  let quote = null;
  for (let index = openIndex; index < sourceText.length; index += 1) {
    const character = sourceText[index];
    if (quote) {
      if (character === quote && sourceText[index - 1] !== '\\') quote = null;
      continue;
    }
    if (character === "'" || character === '"') {
      quote = character;
      continue;
    }
    if (character === '(') depth += 1;
    if (character === ')') {
      depth -= 1;
      if (depth === 0) return compact(`${fallbackName}${sourceText.slice(openIndex, index + 1)}`, 220);
    }
  }
  return fallbackName;
}

function maskSqlNonCode(sourceText) {
  const masked = [...sourceText];
  let index = 0;
  const blank = (cursor) => {
    if (masked[cursor] !== '\n' && masked[cursor] !== '\r') masked[cursor] = ' ';
  };

  while (index < sourceText.length) {
    if (sourceText.startsWith('--', index)) {
      while (index < sourceText.length && sourceText[index] !== '\n') {
        blank(index);
        index += 1;
      }
      continue;
    }
    if (sourceText.startsWith('/*', index)) {
      let depth = 1;
      blank(index);
      blank(index + 1);
      index += 2;
      while (index < sourceText.length && depth > 0) {
        if (sourceText.startsWith('/*', index)) {
          depth += 1;
          blank(index);
          blank(index + 1);
          index += 2;
        } else if (sourceText.startsWith('*/', index)) {
          depth -= 1;
          blank(index);
          blank(index + 1);
          index += 2;
        } else {
          blank(index);
          index += 1;
        }
      }
      continue;
    }
    if (sourceText[index] === "'") {
      blank(index);
      index += 1;
      while (index < sourceText.length) {
        blank(index);
        if (sourceText[index] === "'" && sourceText[index + 1] === "'") {
          blank(index + 1);
          index += 2;
        } else if (sourceText[index] === "'") {
          index += 1;
          break;
        } else {
          index += 1;
        }
      }
      continue;
    }
    if (sourceText[index] === '$') {
      const delimiterMatch = sourceText.slice(index).match(/^\$[A-Za-z_][\w$]*\$|^\$\$/);
      if (delimiterMatch) {
        const delimiter = delimiterMatch[0];
        const end = sourceText.indexOf(delimiter, index + delimiter.length);
        const stop = end === -1 ? sourceText.length : end + delimiter.length;
        while (index < stop) {
          blank(index);
          index += 1;
        }
        continue;
      }
    }
    index += 1;
  }

  return masked.join('');
}

export function extractSqlFile(sourceText, relativePath) {
  const searchableText = maskSqlNonCode(sourceText);
  const expression = /\bCREATE\s+(?:OR\s+REPLACE\s+)?(?:UNIQUE\s+)?(?:CONSTRAINT\s+)?(MATERIALIZED\s+VIEW|TABLE|VIEW|FUNCTION|PROCEDURE|TRIGGER|POLICY|TYPE|INDEX)\s+(?:IF\s+NOT\s+EXISTS\s+)?((?:"[^"]+"|[A-Za-z_][\w$]*)(?:\s*\.\s*(?:"[^"]+"|[A-Za-z_][\w$]*))?)/gim;
  const symbols = [];
  let match;

  while ((match = expression.exec(searchableText)) !== null) {
    const kind = match[1].toLowerCase().replace(/\s+/g, ' ');
    if (!SQL_KINDS.has(kind)) continue;
    const name = match[2].replace(/\s+/g, '');
    const tail = sourceText.slice(expression.lastIndex, expression.lastIndex + 600);
    const relation = relationFromSqlTail(kind, tail);
    const signature = kind === 'function' || kind === 'procedure'
      ? functionSignature(sourceText, expression.lastIndex, name)
      : relation ? `${name} ON ${relation}` : name;

    symbols.push({
      kind,
      name,
      relation,
      signature,
      line: lineNumberAt(sourceText, match.index),
      path: normalizePath(relativePath),
    });
  }

  return symbols;
}

function walkFiles(rootDirectory, extensionFilter) {
  if (!fs.existsSync(rootDirectory)) return [];
  const files = [];
  const pending = [rootDirectory];

  while (pending.length > 0) {
    const current = pending.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        pending.push(absolutePath);
      } else if (extensionFilter(absolutePath)) {
        files.push(absolutePath);
      }
    }
  }

  return files.sort();
}

export async function loadTypeScript(workspaceRoot) {
  const modulePath = path.join(
    workspaceRoot,
    'justifiqa-frontend',
    'node_modules',
    'typescript',
    'lib',
    'typescript.js',
  );
  if (!fs.existsSync(modulePath)) {
    throw new Error(
      'TypeScript compiler tidak ditemukan. Jalankan npm install di justifiqa-frontend terlebih dahulu.',
    );
  }
  return import(pathToFileURL(modulePath).href);
}

export async function collectMapData(workspaceRoot) {
  const ts = await loadTypeScript(workspaceRoot);
  const frontendRoot = path.join(workspaceRoot, 'justifiqa-frontend', 'src');
  const frontendFiles = walkFiles(frontendRoot, (file) => TS_EXTENSIONS.has(path.extname(file)));
  const frontend = frontendFiles
    .map((file) => extractTypeScriptFile(
      ts,
      fs.readFileSync(file, 'utf8'),
      path.relative(workspaceRoot, file),
    ))
    .filter((file) => file.symbols.length > 0);

  const sqlRoots = [
    path.join(workspaceRoot, 'database', 'migrations'),
    path.join(workspaceRoot, 'supabase', 'migrations'),
  ];
  const sqlFiles = sqlRoots.flatMap((sqlRoot) =>
    walkFiles(sqlRoot, (file) => path.extname(file).toLowerCase() === '.sql'));
  const sql = sqlFiles
      .flatMap((file) => extractSqlFile(
        fs.readFileSync(file, 'utf8'),
        path.relative(workspaceRoot, file),
      ));

  const allSourceFiles = [...frontendFiles, ...sqlFiles];
  const sourceByteCount = allSourceFiles.reduce((total, file) => total + fs.statSync(file).size, 0);
  return {
    frontend,
    sql,
    sourceFileCount: allSourceFiles.length,
    sourceByteCount,
  };
}

function sqlPriority(symbol) {
  const sourcePriority = symbol.path.startsWith('supabase/') ? 2 : 1;
  return `${sourcePriority}:${symbol.path}:${String(symbol.line).padStart(8, '0')}`;
}

export function canonicalSqlSymbols(symbols) {
  const grouped = new Map();
  for (const symbol of symbols) {
    const normalizeIdentifier = (identifier) => identifier
      .toLowerCase()
      .replace(/"/g, '')
      .replace(/^public\./, '');
    const relationKey = symbol.relation ? `:${normalizeIdentifier(symbol.relation)}` : '';
    const key = `${symbol.kind}:${normalizeIdentifier(symbol.name)}${relationKey}`;
    const existing = grouped.get(key) ?? [];
    existing.push(symbol);
    grouped.set(key, existing);
  }

  return [...grouped.values()]
    .map((occurrences) => {
      const ordered = [...occurrences].sort((left, right) => sqlPriority(right).localeCompare(sqlPriority(left)));
      return { ...ordered[0], olderCount: ordered.length - 1 };
    })
    .sort((left, right) =>
      left.kind.localeCompare(right.kind) || left.name.localeCompare(right.name),
    );
}

function escapeCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function renderFrontendFile(file) {
  const shortPath = file.path.replace(/^justifiqa-frontend\/src\//, '');
  const kindLabels = {
    class: 'c',
    const: 'v',
    default: 'd',
    enum: 'e',
    fn: 'f',
    interface: 'i',
    're-export': 'x',
    type: 't',
  };
  const symbols = file.symbols
    .map((symbol) => `${symbol.line}${kindLabels[symbol.kind] ?? 'x'} ${symbol.name}`)
    .join(', ');
  return `| ${escapeCell(shortPath)} | ${escapeCell(symbols)} |`;
}

function renderSqlSymbol(symbol) {
  const location = symbol.path
    .replace(/^supabase\/migrations\//, 'S/')
    .replace(/^database\/migrations\//, 'D/');
  const older = symbol.olderCount ? ` +${symbol.olderCount}` : '';
  return `| ${symbol.kind} | ${escapeCell(compact(symbol.signature, 90))} | ${location}:L${symbol.line}${older} |`;
}

export function renderSymbolMap(data) {
  const canonicalSql = canonicalSqlSymbols(data.sql);
  const coreSql = canonicalSql.filter((symbol) => symbol.kind !== 'policy' && symbol.kind !== 'trigger');
  const securitySqlCount = canonicalSql.length - coreSql.length;
  const exportCount = data.frontend.reduce((total, file) => total + file.symbols.length, 0);
  const lines = [
    '# SYMBOLS MAP',
    '',
    '> GENERATED FILE — jangan edit manual. Kode adalah sumber kebenaran.',
    '> Perbarui: `node Tools/generate_symbol_map.mjs`; verifikasi: `node Tools/generate_symbol_map.mjs --check`.',
    '',
    '## Cakupan',
    '',
    `- ${data.sourceFileCount} source files dipindai.`,
    `- ${exportCount} exported TypeScript symbols dalam ${data.frontend.length} files.`,
    `- ${coreSql.length} core PostgreSQL objects dari ${data.sql.length} deklarasi migrasi.`,
    `- ${securitySqlCount} policies/triggers tersedia on-demand di \`MarkDown/SQL_SECURITY_SYMBOLS.md\`.`,
    '- Lokasi SQL memakai `S/` = `supabase/migrations/` dan `D/` = `database/migrations/`; `+N` berarti ada N deklarasi lama.',
    '- Migrasi `supabase/` diprioritaskan di atas salinan `database/`; peta deklarasi ini bukan rekonstruksi state database setelah seluruh migrasi.',
    '- Indeks SQL sengaja tidak dimuat agar peta tetap ringkas; cari dengan `rg "CREATE .*INDEX" database supabase` bila diperlukan.',
    '- Kode simbol frontend: `f` function, `v` variable/const, `i` interface, `t` type, `c` class, `e` enum, `d` default, `x` re-export.',
    '- Import internal dipindai tetapi tidak dicetak; gunakan `rg` setelah menemukan simbol sasaran.',
    '',
    '## Frontend TypeScript',
    '',
    '| File (relatif ke `justifiqa-frontend/src`) | Exported symbols |',
    '| --- | --- |',
    ...data.frontend.map(renderFrontendFile),
    '',
    '## Database PostgreSQL',
    '',
    '| Kind | Symbol/signature | Deklarasi pilihan/terbaru |',
    '| --- | --- | --- |',
    ...coreSql.map(renderSqlSymbol),
    '',
  ];
  return lines.join('\n');
}

export function renderSqlSecurityCatalog(data) {
  const securitySql = canonicalSqlSymbols(data.sql)
    .filter((symbol) => symbol.kind === 'policy' || symbol.kind === 'trigger');
  return [
    '# SQL SECURITY SYMBOLS',
    '',
    '> GENERATED FILE — jangan edit manual. Baca file ini secara on-demand setelah `SYMBOLS_MAP.md` mengarahkan ke area database.',
    '> Perbarui/verifikasi bersama peta utama memakai `node Tools/generate_symbol_map.mjs [--check]`.',
    '',
    `- ${securitySql.length} canonical policies/triggers.`,
    '- Lokasi memakai `S/` = `supabase/migrations/` dan `D/` = `database/migrations/`; `+N` berarti ada N deklarasi lama.',
    '',
    '| Kind | Symbol/relation | Deklarasi pilihan/terbaru |',
    '| --- | --- | --- |',
    ...securitySql.map(renderSqlSymbol),
    '',
  ].join('\n');
}
