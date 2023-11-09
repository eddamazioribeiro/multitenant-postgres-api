'use strict';

const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

const schema = process.env.CLIENT_SCHEMA;

exports.up = function(knex) {
  return knex.schema
    .withSchema(schema).createTable('user', function(table) {
      table.increments('id');
      table.string('email', 255).notNullable();
      table.string('username', 255).notNullable();
    })
    .withSchema(schema).createTable('analysis', function(table) {
      table.increments('id');
      table.string('type', 255).notNullable();
      table.string('title', 255).notNullable();
      table.string('description', 255);
  }).then();
}

exports.down = function(knex) {
  
};