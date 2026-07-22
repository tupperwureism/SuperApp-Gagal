import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  canonicalSqlSymbols,
  extractSqlFile,
  extractTypeScriptFile,
  loadTypeScript,
  renderSqlSecurityCatalog,
  renderSymbolMap,
} from './symbol_map_lib.mjs';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ts = await loadTypeScript(workspaceRoot);

test('extracts exported TypeScript declarations and internal dependencies', () => {
  const result = extractTypeScriptFile(ts, `
    import { hidden } from './internal';
    import React from 'react';
    const localOnly = 1;
    export interface Session extends BaseSession { id: string }
    export function openSession(id: string): Session { return hidden(id); }
    export const SessionCard: React.FC = () => null;
    export { helper as publicHelper } from './helper';
  `, 'justifiqa-frontend/src/session.tsx');

  assert.deepEqual(result.dependencies, ['./helper', './internal']);
  assert.deepEqual(result.symbols.map((symbol) => [symbol.kind, symbol.name]), [
    ['interface', 'Session'],
    ['fn', 'openSession'],
    ['const', 'SessionCard'],
    ['re-export', 'publicHelper'],
  ]);
  assert.equal(result.symbols.some((symbol) => symbol.name === 'localOnly'), false);
});

test('extracts PostgreSQL objects across multiline statements and ignores indexes', () => {
  const symbols = extractSqlFile(`
    -- CREATE TABLE public.commented_out (id uuid);
    CREATE TABLE IF NOT EXISTS public.bookings (id uuid primary key);
    CREATE OR REPLACE FUNCTION public.book_slot(
      p_slot_id uuid,
      p_note text DEFAULT 'hello)'
    ) RETURNS uuid LANGUAGE plpgsql AS $$
      BEGIN
        -- DDL text inside a function body is not a top-level symbol.
        EXECUTE 'CREATE TABLE public.runtime_only (id uuid)';
        RETURN p_slot_id;
      END;
    $$;
    /* CREATE TABLE public.block_commented_out (id uuid); */
    CREATE POLICY booking_read ON public.bookings FOR SELECT USING (true);
    CREATE TRIGGER booking_audit AFTER INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION audit();
    CREATE CONSTRAINT TRIGGER booking_reconcile AFTER UPDATE ON public.bookings DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION reconcile();
    CREATE INDEX idx_bookings ON public.bookings(id);
  `, 'supabase/migrations/001.sql');

  assert.deepEqual(symbols.map((symbol) => symbol.kind), ['table', 'function', 'policy', 'trigger', 'trigger']);
  assert.equal(symbols[1].signature.includes("p_note text DEFAULT 'hello)'"), true);
  assert.equal(symbols[2].relation, 'public.bookings');
  assert.equal(symbols[3].relation, 'public.bookings');
  assert.equal(symbols.some((symbol) => symbol.name === 'commented_out'), false);
  assert.equal(symbols.some((symbol) => symbol.name === 'block_commented_out'), false);
  assert.equal(symbols.some((symbol) => symbol.name === 'runtime_only'), false);
});

test('prefers newer Supabase declarations and reports older occurrences', () => {
  const symbols = [
    ...extractSqlFile('CREATE TABLE public.orders (id uuid);', 'database/migrations/01.sql'),
    ...extractSqlFile('CREATE TABLE public.orders (id uuid, status text);', 'supabase/migrations/02.sql'),
  ];
  const canonical = canonicalSqlSymbols(symbols);

  assert.equal(canonical.length, 1);
  assert.equal(canonical[0].path, 'supabase/migrations/02.sql');
  assert.equal(canonical[0].olderCount, 1);
});

test('normalizes the public schema while canonicalizing SQL symbols', () => {
  const symbols = [
    ...extractSqlFile('CREATE FUNCTION fn_ping() RETURNS void LANGUAGE sql AS $$ SELECT 1 $$;', 'database/migrations/01.sql'),
    ...extractSqlFile('CREATE FUNCTION public.fn_ping() RETURNS void LANGUAGE sql AS $$ SELECT 1 $$;', 'supabase/migrations/02.sql'),
  ];
  const canonical = canonicalSqlSymbols(symbols);

  assert.equal(canonical.length, 1);
  assert.equal(canonical[0].path, 'supabase/migrations/02.sql');
});

test('renders deterministically without a timestamp', () => {
  const data = {
    sourceFileCount: 1,
    frontend: [{
      path: 'justifiqa-frontend/src/example.ts',
      dependencies: [],
      symbols: [{ kind: 'fn', name: 'example', signature: 'example()', line: 1 }],
    }],
    sql: [],
  };
  const first = renderSymbolMap(data);
  const second = renderSymbolMap(data);

  assert.equal(first, second);
  assert.equal(first.includes('GENERATED FILE'), true);
  assert.equal(/generated at|dibuat pada/i.test(first), false);
  assert.equal(renderSqlSecurityCatalog(data).includes('SQL SECURITY SYMBOLS'), true);
});

test('tracked generator files use LF line endings', () => {
  for (const file of ['symbol_map_lib.mjs', 'generate_symbol_map.mjs', 'symbol_map_lib.test.mjs']) {
    const content = fs.readFileSync(path.join(workspaceRoot, 'Tools', file), 'utf8');
    assert.equal(content.includes('\r\n'), false, `${file} contains CRLF`);
  }
});
