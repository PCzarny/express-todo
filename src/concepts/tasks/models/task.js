const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  partOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isCompleted: Boolean,
});

module.exports = mongoose.model('Task', schema);
