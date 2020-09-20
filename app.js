const express = require('express');
const path = require('path');
const cardsRouter = require('./routes/cards').router;
const usersRouter = require('./routes/users').router;

const app = express();
app.use(
  express.static(
    path.join(__dirname, 'public'),
  ),
);
app.use(cardsRouter, usersRouter);

const { PORT = 3000 } = process.env;

app.listen(PORT);

app.get('*', (req, res) => {
  res
    .status(404)
    .send({ 'message': 'Запрашиваемый ресурс не найден' });
});
