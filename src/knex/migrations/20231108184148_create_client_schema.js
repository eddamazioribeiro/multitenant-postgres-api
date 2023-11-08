'use strict';

const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

exports.up = function(knex) {
  const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;

  return knex.raw(`CREATE SCHEMA IF NOT EXISTS ${CLIENT_SCHEMA}`).then(() => {
    knex.destroy();
  });
}

exports.down = function(knex) {
  
};