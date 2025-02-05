import crypto from "crypto";

const generateJwt = (userEmail) => {
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
    aud: "",
  };
  const sharedSecret = process.env.JWT_SHARED_SECRET;

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");

  const fullPayload = { ...payload };

  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64");

  const signature = crypto.createHmac("sha256", sharedSecret).update(`${encodedHeader}.${encodedPayload}`).digest();

  const encodedSignature = signature.toString("base64");

  console.log(`${encodedHeader}.${encodedPayload}.${encodedSignature}`);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

export default generateJwt;
