const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

module.exports = (mongoose) => {
  return mongoose.model('user', userSchema);
};
