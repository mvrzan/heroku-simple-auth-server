import bcrypt from "bcrypt";
import postgresPool from "./postgres-connection.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimeStamp.js";

const createUser = async (email, password) => {
  try {
    // Check if the user already exists
    const checkUserQuery = `
      SELECT email FROM users WHERE email = $1;
    `;
    const checkUserResult = await postgresPool.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length > 0) {
      console.log(`${getCurrentTimestamp()} ⚠️ User with email ${email} already exists.`);
      return { success: false, message: "User already exists" };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user
    const createUserQuery = `
      INSERT INTO users (email, password, created_at)
      VALUES ($1, $2, $3);
    `;
    const values = [email, hashedPassword, new Date(getCurrentTimestamp()).toISOString()];

    await postgresPool.query(createUserQuery, values);

    console.log(`${getCurrentTimestamp()} ✅ The user was successfully registered!`);
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ An error occurred when creating a new user!`, error);
    throw error;
  }
};

export default createUser;
