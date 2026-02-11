const jwt = require("jsonwebtoken");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const signAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // email OK here
    JWT_ACCESS_SECRET,
    { expiresIn: "15m" },
  );
};

const signRefreshToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
