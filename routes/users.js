const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getAllUsers, getUserById, createUser, updateUserProfile, updateUserAvatar, login,
} = require('../controllers/users');

router.get('/users/:id', auth, getUserById);
router.get('/users', auth, getAllUsers);
router.post('/signin', login);
router.post('/signup', createUser);
router.patch('/users/me', auth, updateUserProfile);
router.patch('/users/me/avatar', auth, updateUserAvatar);
module.exports = { router };
