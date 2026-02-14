const usersCollection = require("../DB/Models/users.model");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signAccessToken = (user) => {
  return jwt.sign({ ...user }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const signRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

async function verifyRefreshToken(token) {
  let userData;
  try {
    userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }

  const { id } = userData;

  const user = await usersCollection.findById(id).select("+refreshToken");

  if (!user) throw new Error("User not found");

  const match = token === user.refreshToken;
  if (!match) throw new Error("Refresh token mismatch");

  return user;
}

async function generateNewTokens(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshToken = refreshToken;
  await usersCollection.findByIdAndUpdate(user.id, { refreshToken });

  return { accessToken, refreshToken };
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
  generateNewTokens,
};
