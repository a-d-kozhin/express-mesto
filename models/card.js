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
    validate: {
      validator(v) {
        return /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g.test(v);
      },
      message: 'URL is not valid',
    },
    required: [true, 'Card URL is required'],
  },
  owner: {
    type: ObjectID,
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
