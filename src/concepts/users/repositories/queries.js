const User = require('../models/user');

function findUserById(id) {
  return User.findById(id);
}

module.exports = {
  findUserById,
};
