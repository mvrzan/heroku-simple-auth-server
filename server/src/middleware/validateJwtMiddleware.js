import { getCurrentTimestamp } from "../utils/getCurrentTimestamp.js";
import validateJwt from "../utils/validateJwt.js";

const validateJwtMiddleware = (req, res, next) => {
  console.log(`${getCurrentTimestamp()} 🧪 Validation request received...`);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error(`${getCurrentTimestamp()} ❌ Authorization header was not provided in the request!`);
    return res.status(400).json({ error: "Authorization header was not provided in the request!" });
  }

  const jwtToken = authHeader.split(" ")[1];

  if (!jwtToken) {
    console.error(`${getCurrentTimestamp()} ❌ JWT was not provided in the authorization header!`);
    return res.status(400).json({ error: "JWT was not provided in the authorization header!" });
  }

  const validationResult = validateJwt(jwtToken);

  if (!validationResult.valid) {
    console.error(`${getCurrentTimestamp()} ❌ JWT validation failed: ${validationResult.error}`);
    return res.status(400).json({ error: validationResult.error });
  }

  console.log(`${getCurrentTimestamp()} ✅ JWT successfully validated!`);
  next();
};

export default validateJwtMiddleware;
