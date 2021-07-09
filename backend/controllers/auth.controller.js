const bcrypt = require('bcrypt');
const User = require('../models/index').user;

const jwt = require('../tools/jwt');

const register = async (req, res, next) => {
  try {
      const { email, password } = req.body;
    const userDetails = {
        email,
        password,
    };
    let hashedPassword, newUser;
    if (userDetails.password) {
      hashedPassword = bcrypt.hashSync(userDetails.password, 8);
      delete userDetails.password;
    }
    const updatedUserDetails = { ...userDetails, password: hashedPassword };
    if (updatedUserDetails)
    newUser = await User.create(updatedUserDetails);
    else throw new Error("Couldn't create a Account");
    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
      const foundUser = await User.findOne({ email });
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const accessToken = jwt.generateJwtToken(foundUser);
        const refreshToken = jwt.generateRefreshToken(foundUser);
        return res.status(200).json({
            ...foundUser.toJSON(),
            accessToken,
            refreshToken,
        });
    } else throw Boom.forbidden('Credentials Invalid');
  } catch (error) {
    next(error);
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const newToken = await jwt.verifyRefreshToken(req.body.refreshToken);
    const userId = newToken.production['x-user-id'];
    const user = await User.findById(userId);
    const newAccessToken = jwt.generateJwtToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);
    return res.status(200).json({
      ...user.toJSON(),
      newAccessToken,
      newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const getNewToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    const newAccessToken = jwt.generateJwtToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);
    return res.status(200).json({
      newAccessToken,
      newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  authenticate,
  verifyRefreshToken,
  getNewToken,
};
