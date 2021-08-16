const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");

const User = require("../models/index").user;
const jwt = require("../tools/jwt");

const _register = async ({ email, password }) => {
  try {
    let hashedPassword, newUser;
    const userDetails = {
      email,
      password,
    };
    if (userDetails.password)
      hashedPassword = bcrypt.hashSync(userDetails.password, 8);
    else throw new Boom.badData("Please provide a password");

    const updatedUserDetails = { ...userDetails, password: hashedPassword };

    if (updatedUserDetails) newUser = await User.create(updatedUserDetails);
    else throw new Boom.internal("Couldn't create a Account");

    return newUser;
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const _authenticate = async ({ email, password }) => {
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const accessToken = jwt.generateJwtToken(foundUser);
      const refreshToken = jwt.generateRefreshToken(foundUser);
      return {
        ...foundUser,
        accessToken,
        refreshToken,
      };
    } else throw Boom.forbidden("Credentials Invalid");
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

const _verifyRefreshToken = async ({ refreshToken }) => {
  try {
    const newToken = await jwt.verifyRefreshToken(refreshToken);
    const userId = newToken.production["x-user-id"];
    const user = await User.findById(userId);
    const newAccessToken = jwt.generateJwtToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);
    return {
      ...user,
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    throw Boom.unauthorized(error.message);
  }
};

const _getNewToken = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    const newAccessToken = jwt.generateJwtToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);
    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    throw Boom.unauthorized(error.message);
  }
};

module.exports = {
  _register,
  _authenticate,
  _verifyRefreshToken,
  _getNewToken,
};
