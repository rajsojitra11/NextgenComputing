export const USE_MYSQL = process.env.USE_MYSQL === "true";

let pool: any | null = null;

export async function getPool() {
  if (!USE_MYSQL) throw new Error("MySQL not enabled (set USE_MYSQL=true)");
  if (!pool) {
    const mysql = await import("mysql2/promise");
    const { MYSQL_URL, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_PORT } = process.env as Record<string, string>;
    if (MYSQL_URL) {
      pool = mysql.createPool(MYSQL_URL);
    } else {
      pool = mysql.createPool({
        host: MYSQL_HOST || "localhost",
        user: MYSQL_USER || "root",
        password: MYSQL_PASSWORD || "",
        database: MYSQL_DB || "nextgen_computing",
        port: MYSQL_PORT ? Number(MYSQL_PORT) : 3306,
        connectionLimit: 10,
        namedPlaceholders: true,
        multipleStatements: true,
      });
    }
  }
  return pool;
}
