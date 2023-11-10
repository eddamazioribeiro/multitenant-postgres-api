const express = require('express');
const router = express.Router();
const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;

router.get('/list', async (req, res) => {
  const knexConfig = require('../knex/knexfile');
  const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);

  const result = await knex.withSchema(CLIENT_SCHEMA)
  .select('*')
  .from('user');

  return res.status(200).json({ data: result });
});

module.exports = router;