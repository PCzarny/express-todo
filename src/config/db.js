const mongoose = require('mongoose');

// Register models
require('~concepts/users/models/user');
require('~concepts/tasks/models/task');

function handleDBError(error) {
  console.error(`Connection failed`, error);
}

function initDB() {
  return mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log(`Connected to database: ${process.env.MONGO_URI}`);
      const db = mongoose.connection;
      db.on('error', handleDBError);
    })
    .catch(handleDBError);
}

module.exports = {
  initDB,
};
