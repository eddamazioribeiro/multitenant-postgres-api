const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;
const knexConfig = require('../knex/knexfile');
const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);

exports.getUserById = async (req, res, next, id) => {
  let userId = parseInt(id);

  try {
    const user = await knex
    .withSchema(CLIENT_SCHEMA)
    .select(['id', 'email', 'username'])
    .where({ id: userId })
    .from('user')
    .first();

    if (!user) return res.status(200).json({ data: [], message: `User with id ${id} not found` });
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
}

exports.insertUser = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      username: req.body.username
    };

    const result = await knex('user')
    .withSchema(CLIENT_SCHEMA)
    .returning(['id', 'email', 'username'])
    .insert({ ...user });

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = req.body;

    const result = await knex('user')
    .withSchema(CLIENT_SCHEMA)
    .where({ id: req.user.id })
    .returning(['email', 'username'])
    .update({ ...req.user, ...user });

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let schema = req.query.schema || CLIENT_SCHEMA;
  
    const result = await knex.withSchema(schema)
    .select(['id', 'email', 'username'])
    .from('user');
  
    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    return res.status(200).json({ data: req.user });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await knex('user')
    .withSchema(CLIENT_SCHEMA)
    .where({ id: req.user.id })
    .returning(['id', 'email', 'username'])
    .del();

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(400).json({ data: [], error: err });
  }
};