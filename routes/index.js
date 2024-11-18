var express = require('express');
var router = express.Router();
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');

/* GET Dashboard page. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('home', { link: 'index' });
});

/* GET Login page. */
router.get('/login', (req, res) => {
  res.render('login', { errors: null });
});

// Validation Array
const loginValidate = [
  check('username', 'Username cannot be empty').trim().notEmpty(),
  check('password', 'Password must be at least 3 characters')
    .isLength({ min: 3 }),
];

/* POST Login */
router.post('/login_user', loginValidate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Kirim ulang halaman login dengan pesan error
    return res.status(422).render('login', { errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await userController.findOne({ where: { username } });

    if (!user) {
      return res.status(404).render('login', {
        errors: [{ msg: 'User not found' }],
      });
    }

    if (user.password !== password) {
      return res.status(401).render('login', {
        errors: [{ msg: 'Incorrect password' }],
      });
    }

    // Simpan user di sesi
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/');
  } catch (err) {
    console.error('Error during login process:', err);
    res.status(500).render('login', {
      errors: [{ msg: 'Server error, please try again later' }],
    });
  }
});

/* GET Logout */
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Unable to log out');
    }
    res.redirect('/login');
  });
});

// Routes
router.get('/users_list', errorHandler(async (req, res) => {
  const users = await userController.getAllUsers();
  res.render('home', { link: 'users/user_list', users });
}));

router.get('/user/edit/:id', fetchUserById, (req, res) => res.json(req.user));

router.get('/users_form', (req, res) => {
  res.render('home', { link: 'users/user_form' });
});

router.post('/create_user', errorHandler(userController.createUser));

router.put('/user/update/:id', fetchUserById, errorHandler(userController.updateUser));

router.delete('/user/delete/:id', fetchUserById, errorHandler(userController.deleteUser));

// Global error handler for uncaught errors
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

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
