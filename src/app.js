const express = require('express');
const cors = require('cors');
const morgan = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const CLIENT_SCHEMA = process.env.CLIENT_SCHEMA || 'public';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  let uptime = process.uptime();
  let today = Date().toLocaleString();
  let message = `API em execução na porta: ${ PORT }, Tempo em atividade: ${ uptime }, ${ today }`;

  return res.status(200).json({ message });
});

app.get('/migrations', async (req, res) => {
  const knexConfig = require('./knex/knexfile');
  const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);

  const result = await knex.withSchema(CLIENT_SCHEMA)
  .select('*')
  .from('knex_migrations');

  return res.status(200).json({ data: result });
});

app.listen(PORT, () => {
  console.log(`API is running on port: ${PORT}`);
  console.log(`API Health ping: \x1b[1m\x1b[94mhttp://localhost:${PORT}/health\x1b[39m\x1b[22m`);

  const knexConfig = require('./knex/knexfile');
  const knex = require('knex')(knexConfig[process.env.ENVIRONMENT]);

  knex.raw(`CREATE SCHEMA IF NOT EXISTS ${CLIENT_SCHEMA}`).then(() => {
    console.info('Initialized database');

    knex.migrate.latest({ directory: './src/knex/migrations'}).then(([batchNo, log]) => {
      if (!log.length) {
        console.info('Database is already up to date');
      } else {
        console.info('Ran migrations:\n' + log.join('\n'));
      }
  
      knex.destroy();
    });  
  });
});

module.exports = app;