const express = require('express');
const router = express.Router();
const { executeCode } = require('../controllers/executeController.js');

// Ruta POST para ejecutar código
router.post('/', executeCode);

module.exports = router;
