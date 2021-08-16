const { _getUserById, _getAllUsers } = require("../services/user.service");

const getUserById = async (req, res, next) => {
  try {
    const user = await _getUserById({ ...req.params });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await _getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  getAllUsers,
};
