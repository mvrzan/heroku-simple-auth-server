import postgresPool from "./postgres-connection.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const findUserByEmail = async (email) => {
  try {
    const checkUserQuery = `
    SELECT * FROM users WHERE email = $1;
  `;
    const checkUserResult = await postgresPool.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length === 0) {
      console.log(`${getCurrentTimestamp()} ❌ No user found with email: ${email}`);
      return null;
    }

    const password = checkUserResult.rows[0].password;

    console.log(`${getCurrentTimestamp()} 🔍 A user was found!`);
    return { password };
  } catch (error) {
    console.error(
      `${getCurrentTimestamp()} ❌ An error occurred when searching for the email: ${email}. Error: ${error.message}`,
      error
    );
    throw error;
  }
};

export default findUserByEmail;
