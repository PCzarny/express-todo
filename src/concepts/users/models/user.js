const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

schema.virtual('fullName')
  .get(function getFullName() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function setFullName(value) {
    this.firstName = value.substr(0, value.indexOf(' '));
    this.lastName = value.substr(value.indexOf(' ') + 1);
  });

module.exports = mongoose.model('User', schema);
