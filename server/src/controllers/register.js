import { getCurrentTimestamp } from "../utils/getCurrentTimeStamp.js";
import createUser from "../database/create-user.js";
import emailValidator from "../utils/emailValidator.js";

const register = async (req, res) => {
  console.log(`${getCurrentTimestamp()} 📨 Register new user request received...`);

  const email = req.body?.email;
  const password = req.body?.password;

  if (!emailValidator(email)) {
    console.error(`${getCurrentTimestamp()} ❌ Invalid email address: ${email}`);
    return res.status(400).json({ error: "Invalid email address" });
  }

  console.log(`${getCurrentTimestamp()} ✉️ Incoming email successfully validated!`);

  try {
    await createUser(email, password);

    res.status(200).json({ message: "The user was successfully registered!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default register;
