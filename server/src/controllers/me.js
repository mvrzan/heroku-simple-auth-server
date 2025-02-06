import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";

const me = (_req, res) => {
  console.log(`${getCurrentTimestamp()} 🧪 Validation request received...`);
  res.status(200).json({ message: "JWT successfully validated!" });
};

export default me;
