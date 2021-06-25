require('dotenv').config();
const jwt = require('jsonwebtoken');
const token = require('../constants/token');

const jwtSecret = JSON.parse(process.env.JWT_SECRET);

const generateJwtToken = (user) => {
  return jwt.sign(
    {
      [token.TOKEN_KEY]: {
        'x-user-id': user._id.toString(),
      },
    },
    jwtSecret.key,
    {
      algorithm: jwtSecret.type,
      expiresIn: `${process.env.AUTHENTICATION_JWT_TOKEN_EXPIRES}m`,
    }
  );
};

module.exports = generateJwtToken;
