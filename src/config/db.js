const mongoose = require('mongoose');

// Register models
require('~concepts/users/models/user');
require('~concepts/tasks/models/task');

function handleDBError(error) {
  console.error(`Connection failed`, error);
}

function initDB(mongoURI = process.env.MONGO_URI) {
  return mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log(`Connected to database: ${mongoURI}`);
      const db = mongoose.connection;
      db.on('error', handleDBError);
    })
    .catch(handleDBError);
}

module.exports = {
  initDB,
};
