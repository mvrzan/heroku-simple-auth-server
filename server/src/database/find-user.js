import postgresPool from "./postgres-connection.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const findUser = async (email) => {
  try {
    const checkUserQuery = `
    SELECT * FROM users WHERE email = $1;
  `;
    const checkUserResult = await postgresPool.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length === 0) {
      console.log(`${getCurrentTimestamp()} ❌ No user found with email: ${email}`);
      return null;
    }

    const userPassword = checkUserResult.rows[0].password;

    console.log(`${getCurrentTimestamp()} 🔍 A user was found!`);
    return { password: userPassword };
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ An error occurred when searching for the email: ${email}`, error);
    throw error;
  }
};

export default findUser;
