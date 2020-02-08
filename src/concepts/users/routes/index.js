const express = require('express');
const { findUserById } = require('../repositories/queries');
const userCommands = require('../repositories/commands');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  return findUserById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
});

router.post('/sign-up', (req, res, next) => {
  return userCommands.createUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      req.login(user, (error) => {
        if (error) { return res.json(user); }
        res.json(user);
      });
    })
    .catch(next);
});

module.exports = router;
