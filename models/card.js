const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Name is too short'],
    maxlength: [30, 'Name is too long'],
    required: [true, 'Name is required'],
  },
  link: {
    type: String,
    /* нужен regex для проверки ссылки */
    required: [true, 'Card URL is required'],
  },
  owner: {
    type: ObjectID,
    /* нужен regex для проверки ссылки */
    required: [true, 'OwnerId is required'],
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
