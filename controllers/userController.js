// controllers/userController.js
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      return users;  // Return the users data
    } catch (error) {
      throw new Error('An error occurred while fetching users.');  // Propagate error
    }
  };

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, fullname, password, id_level, is_active, app } = req.body;
    const newUser = await User.create({ username, fullname, password, id_level, is_active, app });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error); // Menampilkan error lengkap di server
    res.status(500).json({ error: 'An error occurred while creating the user.', details: error });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { username, fullname, password, image, id_level, is_active, app } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.update({ username, fullname, password, image, id_level, is_active, app });
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
};
