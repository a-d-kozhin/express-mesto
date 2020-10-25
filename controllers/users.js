const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT = 10;

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

function createUser(req, res) {
  const {
    avatar, about, name, email, password,
  } = req.body;
  if (!avatar) {
    res.status(400).send('Bad request. Avatar link is required');
  }
  if (!about) {
    res.status(400).send('Bad request. About field is required');
  }
  if (!name) {
    res.status(400).send('Bad request. Name is required');
  }
  if (!email) {
    res.status(400).send('Bad request. Email is required');
  }
  if (!password) {
    res.status(400).send('Bad request. Password is required');
  }
  return bcrypt.hash(password, SALT)
    .then((hash) => User.create({
      avatar, about, name, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => res.send({ message: err.message }));
}

function login(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const isMatched = bcrypt.compare(password, user.password);
      if (!isMatched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
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
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
