const Task = require('../models/task');

function createTask(params) {
  return Task.create(params);
}

function updateTask(task, params) {
  return task.set(params).save();
}

function updateTaskById(_id, params) {
  return Task.update({ _id }, params);
}

function deleteTask(_id) {
  return Task.deleteOne({ _id });
}

module.exports = {
  createTask,
  updateTask,
  updateTaskById,
  deleteTask,
};
