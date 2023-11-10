const express = require('express');
const router = express.Router();
const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;
const knexConfig = require('../knex/knexfile');
const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);

router.post('', async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      username: req.body.username
    };

    await knex('user').withSchema(CLIENT_SCHEMA).insert({ ...user });

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
});

router.get('/list', async (req, res) => {
  try {
    let schema = req.query.schema || CLIENT_SCHEMA;
  
    const result = await knex.withSchema(schema)
    .select('*')
    .from('user');
  
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
});

module.exports = router;