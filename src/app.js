const express = require('express');
const cors = require('cors');
const morgan = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  let uptime = process.uptime();
  let today = Date().toLocaleString();
  let message = `API em execução na porta: ${ PORT }, Tempo em atividade: ${ uptime }, ${ today }`;

  return res.status(200).json({ message });
});

app.listen(PORT, () => {
  console.log(`API is running on port: ${PORT}`);
  console.log(`API Health ping: \x1b[1m\x1b[94mhttp://localhost:${PORT}/health\x1b[39m\x1b[22m`);
});

module.exports = app;