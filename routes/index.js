var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { link: 'index' });
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
