import crypto from "crypto";
import { getCurrentTimestamp } from "./getCurrentTimestamp.js";

export const generateJwt = (userEmail) => {
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
      aud: process.env.JWT_AUDIENCE,
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

export const validateJwt = (jwtToken) => {
  try {
    const splitToken = jwtToken.split(".");

    if (splitToken.length !== 3) {
      return { valid: false, error: "Invalid JWT format" };
    }

    const encodedHeader = splitToken[0];
    const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString("utf-8"));

    const encodedPayload = splitToken[1];
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"));

    const encodedSignature = splitToken[2];

    if (header.alg !== "HS256") {
      return { valid: false, error: "Invalid algorithm" };
    }

    if (payload.iss !== process.env.JWT_ISSUER) {
      return { valid: false, error: "Invalid issuer" };
    }

    if (payload.aud !== process.env.JWT_AUDIENCE) {
      return { valid: false, error: "Invalid audience" };
    }

    const now = new Date().getTime() / 1000;
    if (now < payload.nbf || now > payload.exp) {
      return { valid: false, error: "Token is not yet valid or has expired" };
    }

    const expectedSignature = Buffer.from(
      crypto.createHmac("sha256", process.env.JWT_SHARED_SECRET).update(`${encodedHeader}.${encodedPayload}`).digest()
    ).toString("base64url");

    if (expectedSignature !== encodedSignature) {
      return { valid: false, error: "Invalid signature" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: "An error occurred during JWT validation" };
  }
};
