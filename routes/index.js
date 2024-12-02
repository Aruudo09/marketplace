var express = require('express');
var router = express.Router();
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const menuController = require('../controllers/menuController');
const subMenuController = require('../controllers/subMenuController');
const userRoutes = require('./userRoute');
const menuRoutes = require('./menuRoute');

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
    req.session.user = { id: user.id, username: user.username, fullname: user.fullname };
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

// Global error handler for uncaught errors
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// ROUTER

// router.use('/user', userRoutes);
// router.use('/menu', menuRoutes);

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

// Menu
router.get('/menu_list', ensureAuthenticated, errorHandler(async (req, res) => {
  const menu = await menuController.getAllMenu();
  console.log(menu); // Cek apa yang dikembalikan oleh query
  res.render('home', { link: 'menu/menu_list', menu })
}));

// MENU FORM
router.get('/menu_form', ensureAuthenticated, (req, res) => {
  res.render('home', { link: 'menu/menu_form' });
});

// GET MAX MENU
router.get('/menu_get_max', menuController.menuGetMax);

// ADD MENU
router.post('/create_menu', errorHandler(menuController.createMenu));

// GET MENU EDIT DATA
router.get('/menu/edit/:id', menuController.getMenuById);

// UPDATE MENU
router.put('/menu/update/:id_menu', errorHandler(menuController.updateMenu));

// HAPUS MENU
router.delete('/menu/delete/:id', errorHandler(menuController.deleteMenu));

// SUB MENU
router.get('/submenu_list', ensureAuthenticated, errorHandler (async (req, res) => {
  const submenu = await subMenuController.getAllSubMenu();
  console.log(submenu); // Cek apa yang dikembalikan oleh query
  res.render('home', { link: 'submenu/submenu_list', submenu });
} ));

// ADD FORM SUB MENU
router.get('/submenu_form', ensureAuthenticated, (async (req, res) => {
  const opsi = await menuController.getSelectMenu();
  res.render('home', { link:'submenu/submenu_form', opsi });
}));

// INSERT SUB MENU
router.post('/submenu_add', errorHandler(subMenuController.createSubMenu));

module.exports = router;
