var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const sequelize = require('../db');
const userController = require('../controllers/userController');
const { link } = require('.');

dotenv.config();

const app = express();
app.use(express.json());

/* GET Dashboard page. */
router.get('/', function(req, res, next) {
  res.render('home', { link: 'index' });
});

// GET USERS LIST
router.get('/users_list', async function(req, res, next) {
  try {
    // Get all users
    const users = await userController.getAllUsers(req, res);
    // Pass the users data to the view
    res.render('home', { link: 'users/user_list', users: users });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// GET FORM CREATE USERS
router.get('/users_form', function(req, res, next) {
  res.render('home', { link: 'users/user_form' });
});



// POST/INSERT DATA USER
router.post('/create_user', userController.createUser);

/* GET form page */
router.get('/forms/forms', function(req, res, next) {
  res.render('forms/forms');
});

router.get('/tables/tables', function(req, res, next) {
  res.render('tables/tables');
});

router.get('/datatables', function(req, res, next) {
  res.render('home', { link: 'tables/datatables' });
});

router.get('/maps/googlemaps', function(req, res, next) {
  res.render('maps/googlemaps');
});

router.get('/maps/jsvectormap', function(req, res, next) {
  res.render('maps/jsvectormap');
});

router.get('components/avatars', function(req, res, next) {
  res.render('components/avatars');
});

router.get('components/buttons', function(req, res, next) {
  res.render('components/buttons');
});

router.get('components/font-awesome-icons', function(req, res, next) {
  res.render('components/font-awesome-icons');
});

router.get('components/gridsystem', function(req, res, next) {
  res.render('components/gridsystem');
});

router.get('components/notifications', function(req, res, next) {
  res.render('components/notifications');
});

router.get('components/panels', function(req, res, next) {
  res.render('components/panels');
});

router.get('components/simple-line-icons', function(req, res, next) {
  res.render('components/simple-line-icons');
});

router.get('components/sweetalert', function(req, res, next) {
  res.render('components/sweetalert');
});

router.get('components/typography', function(req, res, next) {
  res.render('components/typography');
});

router.get('charts/charts', function(req, res, next) {
  res.render('charts/charts');
});

router.get('charts/sparkline', function(req, res, next) {
  res.render('charts/sparkline');
});

module.exports = router;
