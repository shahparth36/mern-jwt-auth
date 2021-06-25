const User = require('../models/index').user;

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
  getUserById,
  getAllUsers,
};