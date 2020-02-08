const User = require('../models/user');

function findUserById(id) {
  return User.findById(id);
}

function findUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = {
  findUserById,
  findUserByEmail,
};
