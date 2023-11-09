'use strict';

const path = require('path');

const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

exports.up = async function(knex) {
  const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA;

  try {
    const exists = await knex.schema.withSchema(CLIENT_SCHEMA).hasTable('tenant');

    if (!exists) {
      return knex.schema
      .withSchema(CLIENT_SCHEMA).createTable('tenant', function(table) {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('schema', 255).notNullable();
      });
    }
  } catch (error) {
    knex.destroy();
  }
}

exports.down = function(knex) {
  
};