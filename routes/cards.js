const router = require('express').Router();
const {
  validateCreateCard,
  validateRemoveOrLikeCard,
} = require('../middlewares/requestValidation');
const {
  getAllCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateRemoveOrLikeCard, removeCard);
router.put('/:cardId/likes', validateRemoveOrLikeCard, likeCard);
router.delete('/:cardId/likes', validateRemoveOrLikeCard, dislikeCard);

module.exports = { router };
