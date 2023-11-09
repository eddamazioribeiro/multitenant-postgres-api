const path = require('path');
const envPath = path.join(__dirname, '../../.env');

require('dotenv').config({ path: envPath });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pluginDivisionMode: 'schema',
    migrations: {
      tableName: 'knex_migrations',
      schemaName: process.env.CONTROL_SCHEMA
     },
    searchPath: [process.env.CLIENT_SCHEMA, process.env.CONTROL_SCHEMA]
  }
}