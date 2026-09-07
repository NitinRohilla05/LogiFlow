import mysql from "mysql2/promise";

const requiredEnvVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
] as const;

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
}

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function testDatabaseConnection(): Promise<void> {
  try {
    const connection = await db.getConnection();

    await connection.ping();

    connection.release();

    console.log("✅ MySQL database connected successfully.");
  } catch (error) {
    console.error("❌ MySQL database connection failed:", error);

    throw error;
  }
}