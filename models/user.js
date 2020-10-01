// const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

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
    /* нужен regex для проверки ссылки */
    required: [true, 'Avatar URL is required'],
  },
});

module.exports = mongoose.model('user', userSchema);
