const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Name is too short'],
    maxlength: [30, 'Name is too long'],
    required: [true, 'Name is required'],
  },
  about: {
    type: String,
    minlength: [2, 'About is too short'],
    maxlength: [30, 'About is too long'],
    required: [true, 'About is required'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar URL is required'],
    validate: {
      validator(v) {
        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(v);
      },
      message: 'URL is not valid',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'This email has already been taken'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Email is not valid',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
