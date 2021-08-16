const Boom = require("@hapi/boom");

const User = require("../models/index").user;

const _getUserById = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    next(error);
  }
};

const _getAllUsers = async () => {
  try {
    const allUsers = await User.find({});
    return allUsers;
  } catch (error) {
    throw Boom.internal(error.message);
  }
};

module.exports = {
  _getUserById,
  _getAllUsers,
};
