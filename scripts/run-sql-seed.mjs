// Runs a .sql file against the Neon database using DATABASE_URL from .env.
// Usage: node scripts/run-sql-seed.mjs neon/seed_orientation.sql
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { config } from 'dotenv';
import pg from 'pg';

config();

const sqlPath = process.argv[2];
if (!sqlPath) {
  console.error('Usage: node scripts/run-sql-seed.mjs <path-to-sql-file>');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set in .env');
  process.exit(1);
}

const sql = readFileSync(resolve(sqlPath), 'utf8');

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query('BEGIN');
  await client.query(sql);
  await client.query('COMMIT');
  console.log(`Seed applied successfully: ${sqlPath}`);
} catch (err) {
  await client.query('ROLLBACK').catch(() => {});
  console.error('Seed failed, rolled back:', err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
