/**
 * @param jwt screet exipre time
 * @param payload add basic information stored in jwt token!----
 */
const jwt = require("jsonwebtoken");

const createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const createResetToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expireTime,
  });
};

module.exports = {
  createToken,
  verifyToken,
  createResetToken,
};
