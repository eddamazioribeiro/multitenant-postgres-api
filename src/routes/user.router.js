const express = require('express');
const router = express.Router();
const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;
const knexConfig = require('../knex/knexfile');
const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);
const {
  insertUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
  getUserById } = require('../controllers/user.controller');

router.post('', insertUser);
router.put('/:id', updateUser);
router.get('/list', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

router.param('id', getUserById);

module.exports = router;