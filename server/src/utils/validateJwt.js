import crypto from "crypto";

const validateJwt = (jwtToken) => {
  const splitToken = jwtToken.split(".");

  const encodedHeader = splitToken[0];
  const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString("utf-8"));

  const encodedPayload = splitToken[1];
  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"));

  const encodedSignature = splitToken[2];

  if (header.alg !== "HS256") {
    return false;
  }

  if (payload.iss !== process.env.JWT_ISSUER) {
    return false;
  }

  if (payload.aud !== process.env.JWT_AUDIENCE) {
    return false;
  }

  const now = new Date().getTime() / 1000;
  if (now < payload.nbf || now > payload.exp) {
    return false;
  }

  const expectedSignature = Buffer.from(
    crypto.createHmac("sha256", process.env.JWT_SHARED_SECRET).update(`${encodedHeader}.${encodedPayload}`).digest()
  ).toString("base64url");

  return expectedSignature === encodedSignature;
};

export default validateJwt;
