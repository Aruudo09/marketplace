const express = require('express');
const router = express.Router();
const { ensureAuthenticated, errorHandler } = require('../middleware/auth');
const menuController = require('../controllers/menuController');

// MENU LIST
router.get('/list', ensureAuthenticated, errorHandler(async (req, res) => {
  const menu = await menuController.getAllMenu();
  const jslink = '../javascripts/menu_javascript.js';
  res.render('home', { link: 'menu/menu_list', menu, jslink });
}));

// FORM MENU
router.get('/form', ensureAuthenticated, (req, res) => {
  const jslink = '../javascripts/menu_javascript.js';
  res.render('home', { link: 'menu/menu_form', jslink });
});

// ADD MENU
router.post('/create', errorHandler(menuController.createMenu));

// UPDATE MENU
router.put('/update/:id', errorHandler(menuController.updateMenu));

// DELETE MENU
router.delete('/delete/:id', errorHandler(menuController.deleteMenu));

// GET MAX
router.get('/get_max', menuController.menuGetMax);

// GET EDIT DATA
router.get('/edit/:id', menuController.getMenuById);

module.exports = router;
