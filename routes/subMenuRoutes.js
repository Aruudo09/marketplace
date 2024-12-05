const express = require('express');
const router = express.Router();
const { ensureAuthenticated, errorHandler } = require('../middleware/auth');
const subMenuController = require('../controllers/subMenuController');
const menuController = require('../controllers/menuController');

// SUBMENU LIST
router.get('/list', ensureAuthenticated, errorHandler(async (req, res) => {
  const submenu = await subMenuController.getAllSubMenu();
  const opsi = await menuController.getSelectMenu();
  const jslink = '../javascripts/subMenu_javascript.js';
  res.render('home', { link: 'submenu/submenu_list', submenu, opsi, jslink });
}));

// FORM SUBMENU
router.get('/form', ensureAuthenticated, async (req, res) => {
  const opsi = await menuController.getSelectMenu();
  const jslink = '../javascripts/subMenu_javascript.js';
  res.render('home', { link: 'submenu/submenu_form', opsi, jslink });
});

// SUBMENU GET MAX
router.get('/get_max', subMenuController.subMenuGetMax);

// SUBMENU GET EDIT DATA
router.get('/edit/:id', subMenuController.getSubMenuById);

// ADD SUBMENU
router.post('/create', errorHandler(subMenuController.createSubMenu));

// UPDATE SUBMENU
router.put('/update/:id', errorHandler(subMenuController.updateSubMenu));

// DELETE SUBMENU
router.delete('/delete/:id', errorHandler(subMenuController.deleteSubMenu));

module.exports = router;
