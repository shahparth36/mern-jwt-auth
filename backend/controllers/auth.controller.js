const User = require('../models/index').user;
const bcrypt = require('bcrypt');
const generateJwtToken = require('../tools/generateJwtToken');

const register = async (req, res) => {
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
    res.status(400).json(error.message);
  }
};

const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
      const foundUser = await User.findOne({ email });
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const accessToken = generateJwtToken(foundUser);
        return res.status(200).json({
            ...foundUser.toJSON(),
            accessToken,
        });
    } else throw Boom.forbidden('Credentials Invalid');
  } catch (error) {
    res.status(403).json(error.message);
  }
};

module.exports = {
  register,
  authenticate,
};
