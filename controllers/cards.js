const Card = require('../models/card');
const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError.js');
const NotFoundError = require('../errors/NotFoundError.js');

function createCard(req, res, next) {
  const { name, link } = req.body;

  return Card.create({ owner: req.user._id, link, name })
    .then((card) => res.status(201).send(card))
    .catch(next);
}

function getAllCards(req, res, next) {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

function removeCard(req, res, next) {
  return Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) return next(new NotFoundError('Нет карточки с таким id'));

      const isOwner = card.owner === req.user._id;
      if (!isOwner) return next(new UnauthorizedError('Нельзя удалять чужие карточки'));
      return Card.deleteOne(card);
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch(next);
}

function likeCard(req, res, next) {
  return User.findOne({ _id: req.user._id })
    .then((user) => Card.findOneAndUpdate(
      { _id: req.params.cardId },
      { $addToSet: { likes: user } },
      { new: true },
    ))
    .then((user) => res.status(200).send(user))
    .catch(next);
}

function dislikeCard(req, res, next) {
  return Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
}

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
