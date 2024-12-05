const express = require('express');
const router = express.Router();
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');
const userLevelController = require('../controllers/userLevelController');

// USER LIST
router.get('/list', ensureAuthenticated, errorHandler(async (req, res) => {
  const users = await userLevelController.getAllUserLevel();
  const jslink = '../javascripts/userlevel_javascript.js';
  res.render('home', { link: 'userLevel/userlevel_list', users, jslink });
}));

// FORM USER
router.get('/form', ensureAuthenticated, (req, res) => {
  const jslink = '../javascripts/userlevel_javascript.js';
  res.render('home', { link: 'userlevel/userlevel_form', jslink });
});

// ADD USER
router.post('/create', errorHandler(userLevelController.createUserLevel));

// UPDATE USER
router.put('/update/:id', fetchUserById, errorHandler(userLevelController.updateUserLevel));

// DELETE USER
router.delete('/delete/:id', fetchUserById, errorHandler(userLevelController.deleteUserLevel));

// GET EDIT DATA USERS
router.get('/edit/:id', fetchUserById, (req, res) => res.json(req.user));

module.exports = router;
