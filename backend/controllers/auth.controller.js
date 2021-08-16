const {
  _register,
  _authenticate,
  _verifyRefreshToken,
  _getNewToken,
} = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const newUser = await _register({ ...req.body });
    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const authenticate = async (req, res, next) => {
  try {
    const authenticatedUser = await _authenticate({ ...req.body });
    return res.status(200).json(authenticatedUser);
  } catch (error) {
    next(error);
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshedTokens = await _verifyRefreshToken({ ...req.body });
    return res.status(200).json(refreshedTokens);
  } catch (error) {
    next(error);
  }
};

const getNewToken = async (req, res, next) => {
  try {
    const newTokens = await _getNewToken({ ...req.body });
    return res.status(200).json(newTokens);
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  authenticate,
  verifyRefreshToken,
  getNewToken,
  verifyUser,
};
