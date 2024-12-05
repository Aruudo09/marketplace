require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./db'); // This will connect to the database
const session = require('express-session');
const Menu = require('./models/Menu');
const SubMenu = require('./models/SubMenu');
const loadSidebar = require('./middleware/loadSidebar');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, '../assets')));  
app.use(express.static(path.join(__dirname, 'public')));

// Middleware session (harus sebelum rute)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

//USERNAME SESSIONS
app.use((req, res, next) => {
  res.locals.username = req.session.user ? req.session.user.username : null;
  res.locals.fullname = req.session.user ? req.session.user.fullname : null;
  res.locals.id_level = req.session.user ? req.session.user.id_level : null;
  next();
});

app.use(loadSidebar);

// Routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(`404 - Not Found: ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server only if the database connection is successful
sequelize.authenticate()
  .then(() => {
    console.log('Database connected. Starting server...');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  // Deklarasi relasi
Menu.hasMany(SubMenu, { foreignKey: 'id_menu', as: 'subMenus' });
SubMenu.belongsTo(Menu, { foreignKey: 'id_menu', as: 'korelasi' });

module.exports = app;
