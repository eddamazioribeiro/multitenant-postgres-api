const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
  let uptime = process.uptime();
  let today = Date().toLocaleString();
  let message = `API running in port: ${ req.config.PORT }, Uptime: ${ uptime }, ${ today }`;

  return res.status(200).json({ message });
});

module.exports = router;