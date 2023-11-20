import asyncHandler from "../utils/asycnhandler.js";
import jwt from "jsonwebtoken";

const options = {
  algorithm: "HS256",
  expiresIn: "24h",
};

const getAccessToken = async (payload) => {
  const secret = process.env.JWT_SECRET;
  const token = await jwt.sign(payload, secret, options);
  return token;
};
const verifyToken = async (token) => {
  const secret = process.env.JWT_SECRET;
  const decodedToken = await jwt.verify(token, secret, options);

  const { exp } = decodedToken;

  if (!exp || typeof exp !== "number") {
    throw new CustomError("Invalid token expiration", 400);
  }

  return decodedToken;
};

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(500).json({ error: "you are unauthorized." });
  const isValidatoken = await verifyToken(token);
  if (!isValidatoken)
    return res.status(400).json({ error: "Something went wrong." });
  req.user_id = isValidatoken.id;
  req.email = isValidatoken.email;
  req.name = isValidatoken.name;
  next();
});

export default authMiddleware;
