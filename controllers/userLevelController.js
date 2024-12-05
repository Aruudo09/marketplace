const UserLevel = require('../models/UserLevel');

// Utility function for centralized error response
const handleErrorResponse = (res, error, message) => {
    console.error(error); // Log full error on server
    res.status(500).json({ error: message });
};

// Get all users
exports.getAllUserLevel = async () => {
    try {
      return await UserLevel.findAll();
    } catch (error) {
      throw new Error('An error occurred while fetching users.');
    }
  };
  
  // Get userlevel by ID
  exports.getUserLevelById = async (id) => {
    try {
      const userlevel = await UserLevel.findByPk(id);
      if (!userlevel) throw new Error('User not found.');
      return userlevel;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  exports.findOne = async (condition) => {
    try {
      console.log('Condition for findOne:', condition); // Debugging
      const userlevel = await UserLevel.findOne(condition);
      console.log('User found:', userlevel); // Debugging
      return userlevel;
    } catch (error) {
      console.error('Error in findOne:', error); // Debugging
      throw error; // Agar error bisa ditangani di tempat lain
    }
  };
  
  // Create a new user
  exports.createUserLevel = async (req, res) => {
    const { id_level, nama_level } = req.body;
    try {
      const newUser = await User.create({ id_level, nama_level });
      res.status(201).json(newUser);
    } catch (error) {
      handleErrorResponse(res, error, 'An error occurred while creating the user.');
    }
  };
  
  // Update a userlevel
  exports.updateUserLevel = async (req, res) => {
    const { id_level, nama_level } = req.body;
    try {
      const userlevel = await exports.getUserLevelById(req.params.id); // Reuse getUserById function
      await userlevel.update({ id_level, nama_level });
      res.json(userlevel);
    } catch (error) {
      if (error.message === 'User not found.') {
        res.status(404).json({ error: error.message });
      } else {
        handleErrorResponse(res, error, 'An error occurred while updating the user.');
      }
    }
  };
  
  // Delete a userlevel
  exports.deleteUser = async (req, res) => {
    try {
      const userlevel = await exports.getUserLevelById(req.params.id); // Reuse getUserById function
      await userlevel.destroy();
      res.json({ message: 'User Level deleted successfully.' });
    } catch (error) {
      if (error.message === 'User Level not found.') {
        res.status(404).json({ error: error.message });
      } else {
        handleErrorResponse(res, error, 'An error occurred while deleting the user.');
      }
    }
  };