const User = require("../models/index").user;

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  getAllUsers,
};
