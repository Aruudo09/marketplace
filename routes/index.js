const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const menuRoutes = require('./menuRoutes');
const subMenuRoutes = require('./subMenuRoutes');
const userLevelRoutes = require('./userLevelRoutes');
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const loadSidebar = require('../middleware/loadSidebar');
const userController = require('../controllers/userController');

// Default Route
router.get('/', (req, res) => {
  const jslink = 'javascripts/javascript.js';
  res.render('home', { link: 'index', jslink });
});

// Login Routes
router.get('/login', (req, res) => {
  res.render('login', { errors: null });
});

// router.post('/login_user', loginValidate, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Kirim ulang halaman login dengan pesan error
//     return res.status(422).render('login', { errors: errors.array() });
//   }

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Unable to log out');
    res.redirect('/login');
  });
});

/* GET Dashboard page. */
router.get('/', ensureAuthenticated, function(req, res) {
  const jslink = 'javascripts/javascript.js';
  res.render('home', { link: 'index', jslink});
});

/* GET Login page. */
router.get('/login', (req, res) => {
  res.render('login', { errors: null });
});

// // Validation Array
const loginValidate = [
  check('username', 'Username cannot be empty').trim().notEmpty(),
  check('password', 'Password must be at least 3 characters')
    .isLength({ min: 3 }),
];

// /* POST Login */
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
    req.session.user = { id: user.id, username: user.username, fullname: user.fullname };
    res.redirect('/');
  } catch (err) {
    console.error('Error during login process:', err);
    res.status(500).render('login', {
      errors: [{ msg: 'Server error, please try again later' }],
    });
  }
});

// /* GET Logout */
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Unable to log out');
    }
    res.redirect('/login');
  });
});

// Use Split Routes
router.use('/users', userRoutes);
router.use('/menu', menuRoutes);
router.use('/submenu', subMenuRoutes);
router.use('/userlevel', userLevelRoutes);

module.exports = router;
