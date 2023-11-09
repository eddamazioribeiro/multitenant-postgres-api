'use strict';

const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });

exports.up = async function(knex) {
  const CONTROL_SCHEMA = process.env.CONTROL_SCHEMA;

  try {
    knex.raw(`CREATE SCHEMA IF NOT EXISTS ${CONTROL_SCHEMA}`).then(() => {
      console.info('Initialized database');
  
      knex.migrate.latest({ directory: './src/knex/migrations'}).then(async([batchNo, log]) => {
        if (!log.length) {
          console.info('Database is already up to date');
        } else {
          console.info('Ran migrations:\n' + log.join('\n'));
        }
    
        knex.destroy();
        
        const exists = await knex.schema.hasTable('tenant');
  
        if (!exists) {
          return knex.schema
          .withSchema(CONTROL_SCHEMA).createTable('tenant', function(table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('schema', 255).notNullable();
          }).then();
        }
      });  
    });
  } catch (error) {
    knex.destroy();
  }
}

exports.down = function(knex) {
  
};
