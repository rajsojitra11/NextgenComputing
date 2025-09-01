import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

async function main() {
  const MYSQL_URL = process.env.MYSQL_URL;
  const host = process.env.MYSQL_HOST || 'localhost';
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DB || 'nextgen_computing';
  const port = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306;

  const sqlPath = path.resolve(process.cwd(), 'server/db/mysql/schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');

  const conn = MYSQL_URL
    ? await mysql.createConnection({ uri: MYSQL_URL, multipleStatements: true })
    : await mysql.createConnection({ host, user, password, port, multipleStatements: true });

  try {
    console.log('Applying schema...');
    await conn.query(sql);
    // Ensure database exists and then point to it
    await conn.query(`USE ${database}`);
    console.log('Schema applied successfully.');
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
