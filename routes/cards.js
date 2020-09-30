const router = require('express').Router();
const { getAllCards, createCard, removeCard } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', removeCard);

module.exports = { router };
