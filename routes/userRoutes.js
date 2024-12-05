const express = require('express');
const router = express.Router();
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');
const userController = require('../controllers/userController');

// USER LIST
router.get('/list', ensureAuthenticated, errorHandler(async (req, res) => {
  const users = await userController.getAllUsers();
  const jslink = '../javascripts/user_javascript.js';
  res.render('home', { link: 'users/user_list', users, jslink });
}));

// FORM USER
router.get('/form', ensureAuthenticated, (req, res) => {
  const jslink = '../javascripts/user_javascript.js';
  res.render('home', { link: 'users/user_form', jslink });
});

// ADD USER
router.post('/create', errorHandler(userController.createUser));

// UPDATE USER
router.put('/update/:id', fetchUserById, errorHandler(userController.updateUser));

// DELETE USER
router.delete('/delete/:id', fetchUserById, errorHandler(userController.deleteUser));

// GET EDIT DATA USERS
router.get('/edit/:id', fetchUserById, (req, res) => res.json(req.user));

module.exports = router;
