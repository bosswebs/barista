import { neon } from '@neondatabase/serverless';

export type Row = Record<string, any>;
export type SqlTag = (strings: TemplateStringsArray, ...values: any[]) => Promise<Row[]>;

let _sql: SqlTag | null = null;

// Lazy init: never call neon() at module top-level, since Vercel evaluates
// module code at build time before env vars are guaranteed to exist.
// Cast to a plain tagged-template function returning Row[] - every call site
// here uses default (non-array, non-fullResults) mode, so this matches actual
// runtime behavior and avoids fighting the library's conditional generic types.
export function getSql(): SqlTag {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    _sql = neon(process.env.DATABASE_URL) as unknown as SqlTag;
  }
  return _sql;
}
