const express = require('express');
const {
  createColabSpace,
  getColabSpaceByCode,
  addParticipant,
  removeParticipant,
  toggleIsActiveForParticipants
} = require('../controllers/colabSpacesController');

const router = express.Router();

// Rutas agrupadas y optimizadas
router.route('/')
  .post(createColabSpace);

router.route('/:code')
  .get(getColabSpaceByCode);

router.route('/:code/participants')
  .post(addParticipant)
  .delete(removeParticipant);

router.route('/:code/toggle-active')
  .put(toggleIsActiveForParticipants);

module.exports = router;