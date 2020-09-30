const router = require('express').Router();
const { getAllUsers, getUserById, addUser } = require('../controllers/users');

router.get('/users/:id', getUserById);
router.get('/users', getAllUsers);
router.post('/users', addUser);

module.exports = { router };
