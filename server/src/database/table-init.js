import postgresPool from "./postgres-connection.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimeStamp.js";

const tableInit = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(255) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    await postgresPool.query(createTableQuery);

    console.log(`${getCurrentTimestamp()} 🗂️ Required user table is ready for use!`);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ An error occurred when creating required database tables!`, error);
  }
};

export default tableInit;
