const path = require('path');
const { getJson } = require('../helpers/read-file');

function getAllCards(req, res) {
  return getJson(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((data) => {
      if (!data) {
        res
          .status(500)
          .send({ message: 'Ошибка чтения файла' });
        return;
      }
      res
        .status(200)
        .send(data);
    });
}

module.exports = {
  getAllCards,
};
