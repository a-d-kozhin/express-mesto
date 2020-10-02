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
  const { avatar, about, name } = req.body;
  if (!avatar) {
    res.status(400).send('Bad request. Avatar link is required');
  }
  if (!about) {
    res.status(400).send('Bad request. About field is required');
  }
  if (!name) {
    res.status(400).send('Bad request. Name is required');
  }
  return User.create(req.body)
    .then((user) => {
      res
        .status(201)
        .send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateUserProfile(req, res) {
  const { about, name } = req.body;
  if (!about) {
    res.status(400).send('Bad request. About field is required');
  }
  if (!name) {
    res.status(400).send('Bad request. Name is required');
  }
  return User.findOneAndUpdate(
    { _id: req.user._id },
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(400).send('Bad request. Avatar link is required');
  }
  return User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
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
  updateUserProfile,
  updateUserAvatar,
};
