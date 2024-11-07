const express = require('express');
const router = express.Router();
const { generateSignature, createMeeting } = require('../controllers/zoomController');

router.post('/signature', async (req, res) => {
    try {
        const data = req.body;
        const signature = await generateSignature(data.meetingNumber, data.role);
        res.send({ signature });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/meeting', async (req, res) => {
    try {
        const meetingId = await createMeeting();
        res.send({ meetingId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;