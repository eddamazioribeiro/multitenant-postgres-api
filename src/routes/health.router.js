const express = require('express');
const router = express.Router();
const { healthPing } = require('../controllers/health.controller');

router.get('', healthPing);

module.exports = router;