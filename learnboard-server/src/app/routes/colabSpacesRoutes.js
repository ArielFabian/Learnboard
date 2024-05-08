const express = require('express');
const colabSpacesController = require('../controllers/colabSpacesController');

const router = express.Router();

router.get('/', colabSpacesController.getAllColabSpaces);
router.get('/:id', colabSpacesController.getColabSpaceId);
router.post('/', colabSpacesController.createColabSpace);
router.put('/:id', colabSpacesController.updateColabSpace);
router.delete('/:id', colabSpacesController.deleteColabSpace);

module.exports = router;