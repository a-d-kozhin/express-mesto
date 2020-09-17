const router = require('express').Router();
const { getAllUsers, getUserById } = require('../controllers/users');

router.use('/users/:id', getUserById);
router.use('/users', getAllUsers);

module.exports = { router };
