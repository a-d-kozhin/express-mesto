const Card = require('../models/card');

function createCard(req, res) {
  const { name, link } = req.body;
  if (!req.user._id) {
    res.status(400).send('Bad request. Owner id is required');
  }
  if (!link) {
    res.status(400).send('Bad request. Link is required');
  }
  if (!name) {
    res.status(400).send('Bad request. Name is required');
  }
  return Card.create({ owner: req.user._id, link, name })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function getAllCards(req, res) {
  return Card.find({})
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function removeCard(req, res) {
  return Card.deleteOne({ _id: req.params.cardId })
    .then(() => {
      res
        .status(200)
        .send({ message: 'Карточка удалена' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function likeCard(req, res) {
  return Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function dislikeCard(req, res) {
  return Card.findOneAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
