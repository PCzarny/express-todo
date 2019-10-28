const express = require('express');
const { findUserById } = require('../repositories/queries');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  return findUserById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
});

module.exports = router;
