const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  validateCreateUser,
  validateLogin,
  validateUpdateUserProfile,
  validateUpdateUserAvatar,
  validateGetUserById,
} = require('../middlewares/requestValidation');
const {
  getAllUsers, getUserById, createUser, updateUserProfile, updateUserAvatar, login,
} = require('../controllers/users');

router.get('/users/:id', auth, validateGetUserById, getUserById);
router.get('/users', auth, getAllUsers);
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.patch('/users/me', auth, validateUpdateUserProfile, updateUserProfile);
router.patch('/users/me/avatar', auth, validateUpdateUserAvatar, updateUserAvatar);
module.exports = { router };
