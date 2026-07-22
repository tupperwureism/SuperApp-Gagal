#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  collectMapData,
  renderSqlSecurityCatalog,
  renderSymbolMap,
} from './symbol_map_lib.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, '..');
const outputPath = path.join(workspaceRoot, 'MarkDown', 'SYMBOLS_MAP.md');
const securityOutputPath = path.join(workspaceRoot, 'MarkDown', 'SQL_SECURITY_SYMBOLS.md');
const checkOnly = process.argv.includes('--check');

try {
  const data = await collectMapData(workspaceRoot);
  const generated = renderSymbolMap(data);
  const generatedSecurity = renderSqlSecurityCatalog(data);

  if (checkOnly) {
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
    const currentSecurity = fs.existsSync(securityOutputPath)
      ? fs.readFileSync(securityOutputPath, 'utf8')
      : '';
    if (current !== generated || currentSecurity !== generatedSecurity) {
      console.error('Generated symbol maps stale. Jalankan: node Tools/generate_symbol_map.mjs');
      process.exitCode = 1;
    } else {
      console.log(`Generated symbol maps mutakhir (${generated.length + generatedSecurity.length} karakter).`);
    }
  } else {
    fs.writeFileSync(outputPath, generated, 'utf8');
    fs.writeFileSync(securityOutputPath, generatedSecurity, 'utf8');
    console.log(`Menulis ${path.relative(workspaceRoot, outputPath)} (${generated.length} karakter).`);
    console.log(`Menulis ${path.relative(workspaceRoot, securityOutputPath)} (${generatedSecurity.length} karakter).`);
  }
  if (data.sourceByteCount > 0) {
    const primaryRatio = ((Buffer.byteLength(generated, 'utf8') / data.sourceByteCount) * 100).toFixed(2);
    console.log(`Peta primer = ${primaryRatio}% dari ${data.sourceByteCount} byte sumber.`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
