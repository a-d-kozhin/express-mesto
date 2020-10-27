const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError.js');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError.js');

const SALT = 10;

function getUserById(req, res, next) {
  return User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) return next(new NotFoundError('Нет пользователя с таким id'));
      return res.status(200).send(user);
    })
    .catch(next);
}

function getAllUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email, password,
  } = req.body;

  return bcrypt.hash(password, SALT, (error, hash) => {
    User.findOne({ email })
      .then((user) => {
        if (user) return next(new ConflictError('Пользователь с таким email уже есть'));
        return User.create({
          name: 'Имя',
          about: 'О себе',
          avatar: 'https://www.jbrhomes.com/wp-content/uploads/blank-avatar.png',
          email,
          password: hash,
        })
          .then(() => res.status(201).send({ message: `Пользователь ${email} успешно создан!` }))
          .catch((err) => res.status(400).send(err));
      })
      .catch(next);
  });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return next(new UnauthorizedError('Неправильные почта или пароль'));
      return bcrypt.compare(password, user.password, (error, isMatched) => {
        if (!isMatched) {
          return next(new UnauthorizedError('Неправильные почта или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.send({ token });
      });
    })
    .catch(next);
}

function updateUserProfile(req, res, next) {
  const { about, name } = req.body;

  return User.findOneAndUpdate(
    { _id: req.user._id },
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;

  return User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
