const User = require('../models/user');

function getUserById(req, res) {
  return User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res
        .status(200)
        .send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function getAllUsers(req, res) {
  return User.find({})
    .then((users) => {
      res
        .status(200)
        .send(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function addUser(req, res) {
  if (!req.body.avatar) {
    res.status(400).send('Bad request. Avatar link is required');
  }
  if (!req.body.about) {
    res.status(400).send('Bad request. About field is required');
  }
  if (!req.body.name) {
    res.status(400).send('Bad request. Name is required');
  }
  return User.create(req.body)
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
};
