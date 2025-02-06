import crypto from "crypto";
import { getCurrentTimestamp } from "./getCurrentTimestamp.js";

const generateJwt = (userEmail) => {
  try {
    const issueTime = new Date();
    const header = {
      alg: "HS256",
      typ: "JWT",
    };
    const payload = {
      iss: process.env.JWT_ISSUER,
      sub: userEmail,
      iat: ~~(issueTime.getTime() / 1000),
      nbf: ~~(issueTime.getTime() / 1000),
      exp: ~~(issueTime.getTime() / 1000 + 24 * 60 * 60),
      aud: "frontend",
    };
    const sharedSecret = process.env.JWT_SHARED_SECRET;

    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");

    const fullPayload = { ...payload };

    const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");

    const signature = crypto.createHmac("sha256", sharedSecret).update(`${encodedHeader}.${encodedPayload}`).digest();

    const encodedSignature = signature.toString("base64url");

    const jwtToken = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

    console.log(`${getCurrentTimestamp()} 🔐 JWT successfully generated: ${jwtToken}`);
    return jwtToken;
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ An error occurred while generating the JWT:`, error);
    throw error;
  }
};

export default generateJwt;
