import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";
import validateJwt from "../utils/validateJwt.js";

const me = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} 🧪 Validation request received...`);

    const jwtToken = req.body?.jwtToken;

    if (!jwtToken) {
      console.error(`${getCurrentTimestamp()} ❌ JWT was not provided in the request!`);
      return res.status(400).json({ error: "JWT was not provided in the request!" });
    }

    validateJwt(jwtToken);

    console.log(`${getCurrentTimestamp()} ✅ JWT successfully validated!`);
    res.status(200).json({ message: "JWT successfully validated!" });
  } catch (error) {
    console.log(`${getCurrentTimestamp()} An error occurred: ${error}`);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default me;
