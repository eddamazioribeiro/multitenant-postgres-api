'use strict';

const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

exports.up = function(knex) {
  const CONTROL_SCHEMA = process.env.CONTROL_SCHEMA;

  return knex.schema
  .withSchema(CONTROL_SCHEMA).createTable('tenant', function(table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('schema', 255).notNullable();
  }).then();
}

exports.down = function(knex) {
  
};
