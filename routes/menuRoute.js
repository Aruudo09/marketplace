const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { ensureAuthenticated, errorHandler, fetchUserById } = require('../middleware/auth');

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

module.exports = router;