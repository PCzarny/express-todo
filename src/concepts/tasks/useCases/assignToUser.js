const NotFoundError = require('~concepts/errors/NotFound');

const taskCommands = require('../repositories/commands');
const taskQueries = require('../repositories/queries');

function assignTaskToUser(taskId, userId) {
  return taskQueries.findTaskById(taskId)
    .then((task) => {
      if (!task) return Promise.reject(new NotFoundError());
      return taskCommands.updateTask(task, userId);
    });
}

module.exports = { assignTaskToUser };
