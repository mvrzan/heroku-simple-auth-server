import postgresPool from "./postgres-connection.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const initTable = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      email VARCHAR(255) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    const createUpdateFunction = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;

    const dropUpdateTrigger = `
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    `;

    const createUpdateTrigger = `
      CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `;

    await postgresPool.query(dropUpdateTrigger);
    await postgresPool.query(createTableQuery);
    await postgresPool.query(createUpdateFunction);
    await postgresPool.query(createUpdateTrigger);

    console.log(`${getCurrentTimestamp()} 🗂️ Required user table is ready for use!`);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ An error occurred when creating required database tables!`, error);
    throw error;
  }
};

export default initTable;
