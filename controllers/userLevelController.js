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

  const findUserLevelById = async (id) => {
    return await UserLevel.findByPk(id);
  };
  
  // Get userlevel by ID
  exports.getUserLevelById = async (req, res) => {
    const { id } = req.params;
    try {
      const menu = await findUserLevelById(id);
      if (!menu) {
        return res.status(404).json({ error: 'UserLevel not found.' });
      }
      return res.status(200).json(menu);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while fetching the menu.' });
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
    const { nama_level } = req.body;
    try {
      const newUser = await UserLevel.create({ nama_level });
      res.status(201).json(newUser);
    } catch (error) {
      handleErrorResponse(res, error, 'An error occurred while creating the user.');
    }
  };
  
  // Update a userlevel
  exports.updateUserLevel = async (req, res) => {
    const { id } = req.params;
    const { nama_level } = req.body;
    try {
      const userlevel = await findUserLevelById(id);
      if (!userlevel) {
        return res.status(404).json({ error: 'UserLevel not found.' });
      }
      await userlevel.update({ nama_level });
      return res.status(200).json(userlevel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the user level.' });
    }
  };
  
  // Delete a userlevel
  exports.deleteUserLevel = async (req, res) => {
    const { id } = req.params;
    try {
      const userlevel = await findUserLevelById(id); // Reuse getUserById function
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