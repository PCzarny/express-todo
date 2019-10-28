const Task = require('../models/task');

function findTaskById(id) {
  return Task.findById(id);
}

module.exports = {
  findTaskById,
};
