function isValidPassword(user, password) {
  // TODO: Add password hashing
  return user.password === password;
}

module.exports = {
  isValidPassword,
};
