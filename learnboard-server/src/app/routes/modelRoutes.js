const express = require('express');
const router = express.Router();
const { processImage } = require('../controllers/modelController');

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

module.exports = router;