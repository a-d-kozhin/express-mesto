const router = require('express').Router();
const { getAllCards } = require('../controllers/cards');

router.use('/cards', getAllCards);

module.exports = { router };
