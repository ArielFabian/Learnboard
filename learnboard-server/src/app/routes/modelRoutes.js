const express = require('express');
const router = express.Router();
const { processImage, processLatex } = require('../controllers/modelController');

// Ruta para procesar la imagen
router.post('/process-image', async (req, res) => {
    try {
        const base64Image = req.body.image;
        const result = await processImage(base64Image);
        res.send({ result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Ruta para procesar Latex
router.post('/process-latex', async (req, res) => {
    try {
        const expression = req.body.expression;
        const result = await processLatex(expression);
        res.send({ result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;