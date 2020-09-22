const fsPromises = require('fs').promises;

const getJson = (filePath) => fsPromises.readFile(filePath, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => err);

module.exports = {
  getJson,
};
