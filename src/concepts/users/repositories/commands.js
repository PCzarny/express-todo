const User = require('../models/user');

function createUser(options) {
  return User.create(options);
}

function updateUser(user, params) {
  return user.set(params).save();
}

function updateUserById(_id, params) {
  return User.update({ _id }, params);
}

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

module.exports = {
  createUser,
  updateUser,
  updateUserById,
  deleteUser,
};
