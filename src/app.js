const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initDatabase, runMigrations } = require('./db/utils');
// routes
const healthRoutes = require('./routes/health.router');
const userRoutes = require('./routes/user.router');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/health', function (req, res, next) {
  req.config = {
    PORT: PORT
  }
  next();
}, healthRoutes);

app.use('/user', userRoutes);

app.listen(PORT, async () => {
  console.log(`API is running on port: ${PORT}`);
  console.log(`API Health ping: \x1b[1m\x1b[94mhttp://localhost:${PORT}/health\x1b[39m\x1b[22m`);

  await initDatabase();
  await runMigrations();
});

module.exports = app;