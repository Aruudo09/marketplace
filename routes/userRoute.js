const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');

// USER LIST
router.get('/users_list', ensureAuthenticated, errorHandler(async (req, res) => {
  const users = await userController.getAllUsers();
  res.render('home', { link: 'users/user_list', users });
}));

// MENAMPILKAN DATA EDIT USER USER
router.get('/user/edit/:id', fetchUserById, (req, res) => res.json(req.user));

// FORM USER
router.get('/users_form', ensureAuthenticated, (req, res) => {
  res.render('home', { link: 'users/user_form' });
});

// ADD USER
router.post('/create_user', errorHandler(userController.createUser));

// UPDATE USER
router.put('/user/update/:id', fetchUserById, errorHandler(userController.updateUser));

// DELETE USER
router.delete('/user/delete/:id', fetchUserById, errorHandler(userController.deleteUser));

module.exports = router;
