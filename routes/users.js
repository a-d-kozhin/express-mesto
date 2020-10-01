const router = require('express').Router();
const {
  getAllUsers, getUserById, addUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/users/:id', getUserById);
router.get('/users', getAllUsers);
router.post('/users', addUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = { router };
