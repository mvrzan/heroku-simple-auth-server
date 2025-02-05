import bcrypt from "bcrypt";
import generateJwt from "../utils/generateJwt.js";
import findUserByEmail from "../database/find-user.js";
import isEmailValid from "../utils/emailValidator.js";
import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const login = async (req, res) => {
  console.log(`${getCurrentTimestamp()} 🔑 Login  request received...`);

  const email = req.body?.email;
  const password = req.body?.password;

  if (!isEmailValid(email)) {
    console.error(`${getCurrentTimestamp()} ❌ Invalid email address: ${email}`);
    return res.status(400).json({ error: `Invalid email address: ${email}` });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: `User not found for email ${email}` });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      console.error(`${getCurrentTimestamp()} ❌ Incorrect password for email: ${email}`);
      return res.status(403).json({ error: "Incorrect password" });
    }

    const token = generateJwt(email);

    console.log(`${getCurrentTimestamp()} ✅ User login was successful!`);
    res.status(200).json({ message: "User login was successful!", token });
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ${error}`);
    res.status(500).send(error);
  }
};

export default login;
