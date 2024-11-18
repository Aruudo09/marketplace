const userController = require('../controllers/userController');

// Login middleware
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.id) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

// Middleware to handle errors in async functions
function errorHandler(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

// Middleware to fetch user by ID and attach to req object
async function fetchUserById(req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({ error: 'User ID is required.' });
    }
    try {
        req.user = await userController.getUserById(req.params.id);
        if (!req.user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { ensureAuthenticated, errorHandler, fetchUserById };
