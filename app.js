const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards').router;
const usersRouter = require('./routes/users').router;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(
  express.static(
    path.join(__dirname, 'public'),
  ),
);

app.use((req, res, next) => {
  req.user = {
    _id: '5f7489292b34b6089013f981',
  };

  next();
});

app.use(cardsRouter, usersRouter);

const { PORT = 3000 } = process.env;

app.listen(PORT);

app.get('*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Запрашиваемый ресурс не найден' });
});
