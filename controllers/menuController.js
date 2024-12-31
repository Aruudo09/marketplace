const Menu = require('../models/Menu');

// Utility function for centralized error response
const handleErrorResponse = (res, error, message) => {
  console.error(error); // Log full error on server
  res.status(500).json({ error: message });
};

// Get all Menu
exports.getAllMenu = async () => {
    try {
      return await Menu.findAll();
    } catch (error) {
        console.error(error); // Menampilkan error secara lebih rinci
      throw new Error('An error occurred while fetching Data.');
    }
  };
  
  // GET SELECT MENU
  exports.getSelectMenu = async () => {
    try {
      return await Menu.findAll({attributes: ['id_menu', 'nama_menu']});
    } catch (error) {
      console.error(error); // Menampilkan error secara lebih rinci
      throw new Error('An error occurred while fetching Data.');
    }
  };

  exports.getMenuById = async (req, res) => {
    const { id } = req.params; // Ambil parameter ID dari request
    try {
      const menu = await Menu.findByPk(id); // Temukan menu berdasarkan primary key
      if (!menu) {
        return res.status(404).json({ error: 'Menu not found.' }); // Kirim respons 404 jika tidak ditemukan
      }
      return res.status(200).json(menu); // Kirim menu yang ditemukan sebagai respons
    } catch (error) {
      console.error(error); // Log kesalahan ke konsol
      return res.status(500).json({ error: 'An error occurred while fetching the menu.' }); // Kirim respons error 500
    }
  };

  exports.createMenu = async (req, res) => {
    const { nama_menu, link, icon, urutan, is_active } = req.body;
    try {
        const newMenu = await Menu.create({nama_menu, link, icon, urutan, is_active});
        res.status(201).json(newMenu);
    } catch(error) {
        handleErrorResponse(res, error, 'An error occurred while creating the menu.');
    }
  };

  exports.updateMenu = async (req, res) => {
    const { id_menu } = req.params; // Ambil id_menu dari URL
    const { nama_menu, link, icon, urutan, is_active } = req.body;
    try {
      const menu = await Menu.findByPk(id_menu); // Temukan menu berdasarkan ID
    if (!menu) {
      return res.status(404).json({ error: id_menu });
    }

    await Menu.update({ nama_menu, link, icon, urutan, is_active }, { where: { id_menu } });
    res.json({ message: 'Menu updated successfully.' });
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the menu.' });
    }
  };

  exports.deleteMenu = async (req,res) => {
    try {
      const user = await Menu.findByPk(req.params.id); // Reuse getUserById function
      await user.destroy();
      res.json({ message: 'Menu deleted successfully.' });
    } catch (error) {
      if (error.message === 'Menu not found.') {
        res.status(404).json({ error: error.message });
      } else {
        handleErrorResponse(res, error, 'An error occurred while deleting the menu.');
      }
    }
  };

  exports.menuGetMax = async (req, res) => {
    try {
      const max = await Menu.max('urutan'); // Asumsi 'Menu' adalah model Sequelize atau ORM lainnya
      res.status(200).json(max); // Kirim data sebagai respons JSON
    } catch (error) {
      console.error(error); // Menampilkan error secara lebih rinci
      res.status(500).json({ error: 'An error occurred while fetching data.' }); // Kirim error dengan status 500
    }
  };