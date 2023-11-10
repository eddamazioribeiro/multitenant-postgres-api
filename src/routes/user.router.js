const express = require('express');
const router = express.Router();
const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;

router.get('/list', async (req, res) => {
  try {
    const knexConfig = require('../knex/knexfile');
    const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);
    console.info('schema', req.query.schema);
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