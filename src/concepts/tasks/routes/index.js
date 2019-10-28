const express = require('express');
const { findTaskById } = require('../repositories/queries');
const taskCommands = require('../repositories/commands');
const assignToUser = require('../useCases/assignToUser');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  return findTaskById(req.params.id)
    .then((task) => res.json(task))
    .catch(next);
});

router.post('/', (req, res, next) => {
  return taskCommands.createTask(req.body)
    .then((task) => res.json(task))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  return taskCommands.updateTaskById(req.params.id, req.body)
    .then((task) => res.json(task))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return taskCommands.deleteTask(req.params.id)
    .then(() => res.json())
    .catch(next);
});

router.post('/:id/assign', (req, res, next) => {
  return assignToUser.assignTaskToUser(req.params.id, req.body.user)
    .then(() => res.json())
    .catch(next);
});

module.exports = router;
