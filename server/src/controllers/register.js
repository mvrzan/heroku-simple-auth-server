import { getCurrentTimestamp } from "../utils/getCurrentTimeStamp.js";

const register = (req, res) => {
  console.log(`${getCurrentTimestamp()} 📨 Register new user request received...`);

  const username = reg.body?.username;
  const password = reg.body?.password;

  try {
    console.log(`${getCurrentTimestamp()} ✅ The user was successfully registered!`);

    res.status(200).json("The user was successfully registered!");
  } catch (error) {
    console.error("❌ Error occurred:", error);
    res.status(500).send(error);
  }
};

export default register;
