const dbConfig = require('./knex/knexfile');

exports.createSchema = (schemaName) => {
  const knex = require('knex')(dbConfig[process.env.ENVIRONMENT]);
  
  try {
    knex.destroy();
  } catch (err) {
    console.log(err);
    knex.destroy();
  }
  knex.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`).then(() => {
    console.info(`Schema successfully created: ${schemaName.toUpperString()}`);
  });
}

exports.createClientSchema = () => {
  const knex = require('knex')(dbConfig[process.env.ENVIRONMENT]);
  
  knex.raw(`CREATE SCHEMA IF NOT EXISTS ${CLIENT_SCHEMA}`).then(() => {
    console.info('Database is already up to date');
 
  });
}

exports.runMigrations = () => {
  const knex = require('knex')(dbConfig[process.env.ENVIRONMENT]);

  knex.migrate.latest({ directory: './src/knex/migrations'}).then(([batchNo, log]) => {
    if (!log.length) {
      console.info('Database is already up to date');
    } else {
      console.info('Ran migrations:\n' + log.join('\n'));
    }

    knex.destroy();
  }); 
}

