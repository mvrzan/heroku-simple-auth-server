import { getCurrentTimestamp } from "../utils/getCurrentTimeStamp.js";
import createUser from "../database/create-user.js";

const register = async (req, res) => {
  console.log(`${getCurrentTimestamp()} 📨 Register new user request received...`);

  const email = req.body?.email;
  const password = req.body?.password;

  try {
    await createUser(email, password);

    res.status(200).json({ message: "The user was successfully registered!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default register;
