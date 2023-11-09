const dbConfig = require('../knex/knexfile');

exports.initDatabase = async () => {
  const { CONTROL_SCHEMA, CLIENT_SCHEMA } = process.env;
  
  await this.createSchema(CONTROL_SCHEMA);
  await this.createSchema(CLIENT_SCHEMA);
}

exports.createSchema = (schemaName) => {
  return new Promise((next, reject) => {
    try {
      const knex = require('knex')(dbConfig[process.env.ENVIRONMENT]);

      knex.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`).then(() => {
        console.info(`Schema successfully created: ${schemaName.toUpperCase()}`);
      });

      next();
    } catch (err) {
      knex.destroy();
      console.log(err);
      reject(err);
    }
  });
}

exports.runMigrations = () => {
  return new Promise((next, reject) => {
    try {
      const knex = require('knex')(dbConfig[process.env.ENVIRONMENT]);
      knex.migrate.latest({ directory: './src/knex/migrations'}).then(([batchNo, log]) => {
        if (!log.length) {
          console.info('Database is already up to date');
        } else {
          console.info('Ran migrations:\n' + log.join('\n'));
        }
    
        next();
      }); 
    } catch (err) {
      knex.destroy();
      console.log(err);
      reject(err);
    }
  });
}

