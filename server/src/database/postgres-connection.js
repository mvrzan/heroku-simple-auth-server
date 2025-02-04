import pg from "pg";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const { Pool } = pg;

const rejectUnauthorizedValue = process.env.NODE_ENV === "development" ? false : true;

const postgresPool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  ssl: { rejectUnauthorized: rejectUnauthorizedValue },
});

postgresPool.on("connect", () => {
  console.log(`${getCurrentTimestamp()} 📦 Database successfully connected!`);
});

export default postgresPool;
