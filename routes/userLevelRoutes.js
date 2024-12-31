const express = require('express');
const router = express.Router();
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');
const userLevelController = require('../controllers/userLevelController');
const UserLevel = require('../models/UserLevel');

// USER LIST
// router.get('/list', ensureAuthenticated, errorHandler(async (req, res) => {
//   const users = await userLevelController.getAllUserLevel();
//   const jslink = '../javascripts/userlevel_javascript.js';
//   res.render('home', { link: 'userLevel/userlevel_list', users, jslink });
// }));

router.get('/list', ensureAuthenticated, (req, res) => {
  const jslink = '../javascripts/userlevel_javascript.js';
  res.render('home', { link: 'userLevel/userlevel_list', jslink });
});


router.post('/list/data', ensureAuthenticated, errorHandler(async (req, res) => {
  const { draw, start, length, search } = req.body; // DataTables parameters
  const searchValue = search.value; // Global search term

  const whereCondition = searchValue
    ? { nama_level: { [Op.like]: `%${searchValue}%` } } // Sequelize WHERE condition for search
    : {};

  const totalRecords = await UserLevel.count();
  const filteredRecords = await UserLevel.count({ where: whereCondition });

  const data = await UserLevel.findAll({
    where: whereCondition,
    offset: start,
    limit: length,
  });

  res.json({
    draw,
    recordsTotal: totalRecords,
    recordsFiltered: filteredRecords,
    data,
  });
}));


// FORM USER
router.get('/form', ensureAuthenticated, (req, res) => {
  const jslink = '../javascripts/userlevel_javascript.js';
  res.render('home', { link: 'userlevel/userlevel_form', jslink });
});

// ADD USER
router.post('/create', errorHandler(userLevelController.createUserLevel));

// UPDATE USER
router.put('/update/:id', errorHandler(userLevelController.updateUserLevel));

// DELETE USER
router.delete('/delete/:id', errorHandler(userLevelController.deleteUserLevel));

// GET EDIT DATA USERS
router.get('/edit/:id', userLevelController.getUserLevelById);

module.exports = router;
