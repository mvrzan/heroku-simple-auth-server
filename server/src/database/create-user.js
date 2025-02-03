import postgresPool from "./postgres-connection.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimeStamp.js";

const createUser = async (email, password) => {
  try {
    const createUserQuery = `
    INSERT INTO users (email, password, created_at)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING;
  `;
    const values = [email, password, new Date(getCurrentTimestamp()).toISOString()];

    await postgresPool.query(createUserQuery, values);

    console.log(`${getCurrentTimestamp()} ✅ The user was successfully registered!`);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ An error occurred when creating a new user!`, error);
    throw error;
  }
};

export default createUser;
