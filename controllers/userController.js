const User = require('../models/User');

// Utility function for centralized error response
const handleErrorResponse = (res, error, message) => {
  console.error(error); // Log full error on server
  res.status(500).json({ error: message });
};

// Get all users
exports.getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error('An error occurred while fetching users.');
  }
};

// Get user by ID
exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found.');
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (condition) => {
  try {
    console.log('Condition for findOne:', condition); // Debugging
    const user = await User.findOne(condition);
    console.log('User found:', user); // Debugging
    return user;
  } catch (error) {
    console.error('Error in findOne:', error); // Debugging
    throw error; // Agar error bisa ditangani di tempat lain
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, fullname, password, id_level, is_active, app } = req.body;
  try {
    const newUser = await User.create({ username, fullname, password, id_level, is_active, app });
    res.status(201).json(newUser);
  } catch (error) {
    handleErrorResponse(res, error, 'An error occurred while creating the user.');
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { username, fullname, password, id_level, is_active, app } = req.body;
  try {
    const user = await exports.getUserById(req.params.id); // Reuse getUserById function
    await user.update({ username, fullname, password, id_level, is_active, app });
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found.') {
      res.status(404).json({ error: error.message });
    } else {
      handleErrorResponse(res, error, 'An error occurred while updating the user.');
    }
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await exports.getUserById(req.params.id); // Reuse getUserById function
    await user.destroy();
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    if (error.message === 'User not found.') {
      res.status(404).json({ error: error.message });
    } else {
      handleErrorResponse(res, error, 'An error occurred while deleting the user.');
    }
  }
};
