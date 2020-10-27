require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards').router;
const usersRouter = require('./routes/users').router;
const NotFoundError = require('./errors/NotFoundError');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use(usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(errorLogger);

const { PORT = 3000 } = process.env;

app.use(errors());

app.get('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => res.status(err.status || 500).send({ message: err.message }));

app.listen(PORT);
