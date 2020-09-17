const path = require('path');
const { getJson } = require('../helpers/read-file');

function getUserById(req, res) {
  return getJson(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      if (!users) {
        res
          .status(500)
          .send('Error, status 500');
        return;
      }
      const foundUser = users.find((user) => user._id === req.params.id);
      if (!foundUser) {
        res
          .status(404)
          .send(`Error, status 404. No user with id ${req.params.id} is found`);
        return;
      }
      res
        .status(200)
        .send(foundUser);
    });
}

function getAllUsers(req, res) {
  return getJson(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      if (!users) {
        res
          .status(500)
          .send('Error, status 500');
        return;
      }
      res
        .status(200)
        .send(users);
    });
}

module.exports = {
  getAllUsers,
  getUserById,
};
