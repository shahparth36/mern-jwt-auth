const jwt = require("jsonwebtoken");
const token = require("../constants/token");
const Boom = require("@hapi/boom");

const jwtSecret = JSON.parse(process.env.JWT_SECRET);
const refreshTokenSecret = JSON.parse(process.env.REFRESH_TOKEN_SECRET);

const generateJwtToken = (user) => {
  return jwt.sign(
    {
      [token.TOKEN_KEY]: {
        "x-user-id": user.id.toString(),
      },
    },
    jwtSecret.key,
    {
      algorithm: jwtSecret.type,
      expiresIn: `${process.env.AUTHENTICATION_JWT_TOKEN_EXPIRES}m`,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      [token.TOKEN_KEY]: {
        "x-user-id": user.id.toString(),
      },
    },
    refreshTokenSecret.key,
    {
      algorithm: refreshTokenSecret.type,
      expiresIn: `${process.env.AUTHENTICATION_REFRESH_TOKEN_EXPIRES}m`,
    }
  );
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    return jwt.verify(refreshToken, refreshTokenSecret.key);
  } catch (err) {
    throw Boom.unauthorized("Invalid Refresh Token");
  }
};

module.exports = {
  generateJwtToken,
  generateRefreshToken,
  verifyRefreshToken,
};
