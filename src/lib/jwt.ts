import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "super-secret-key"; // use env variable in prod

export function generateJWT(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}
