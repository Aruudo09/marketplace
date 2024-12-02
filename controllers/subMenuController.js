const SubMenu = require('../models/SubMenu');

// Utility function for centralized error response
const handleErrorResponse = (res, error, message) => {
    console.error(error); // Log full error on server
    res.status(500).json({ error: message });
  };

  // Get all SubMenu
exports.getAllSubMenu = async () => {
    try {
      return await SubMenu.findAll();
    } catch (error) {
        console.error(error); // Menampilkan error secara lebih rinci
      throw new Error('An error occurred while fetching Data.');
    }
  }; 

  exports.getMenuById = async (req, res) => {
    const { id } = req.params; // Ambil parameter ID dari request
    try {
      const submenu = await SubMenu.findByPk(id); // Temukan submenu berdasarkan primary key
      if (!submenu) {
        return res.status(404).json({ error: 'SubMenu not found.' }); // Kirim respons 404 jika tidak ditemukan
      }
      return res.status(200).json(submenu); // Kirim submenu yang ditemukan sebagai respons
    } catch (error) {
      console.error(error); // Log kesalahan ke konsol
      return res.status(500).json({ error: 'An error occurred while fetching the submenu.' }); // Kirim respons error 500
    }
  };

  exports.createSubMenu = async (req, res) => {
    const { nama_submenu, link, icon, id_menu, is_active, urutan} = req.body;
    try {
        const newSubMenu = await SubMenu.create({nama_submenu, link, icon, id_menu, is_active, urutan});
        res.status(201).json(newSubMenu);
    } catch(error) {
        handleErrorResponse(res, error, 'An error occurred while creating the submenu.');
    }
  };

  exports.updateMenu = async (req, res) => {
    const { id_submenu } = req.params; // Ambil id dari URL
    const { nama_submenu, link, icon, id_menu, urutan, is_active } = req.body;
    try {
      const submenu = await SubMenu.findByPk(id_submenu); // Temukan submenu berdasarkan ID
    if (!submenu) {
      return res.status(404).json({ error: 'SubMenu not found.' });
    }

    await SubMenu.update({ nama_submenu, link, icon, id_menu, urutan, is_active }, { where: { id_submenu } });
    res.json({ message: 'SubMenu updated successfully.' });
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the submenu.' });
    }
  };

  exports.deleteMenu = async (req,res) => {
    try {
      const user = await SubMenu.findByPk(req.params.id); // Reuse getUserById function
      await user.destroy();
      res.json({ message: 'SubMenu deleted successfully.' });
    } catch (error) {
      if (error.message === 'SubMenu not found.') {
        res.status(404).json({ error: error.message });
      } else {
        handleErrorResponse(res, error, 'An error occurred while deleting the submenu.');
      }
    }
  };

  exports.menuGetMax = async (req, res) => {
    try {
      const max = await SubMenu.max('urutan'); // Asumsi 'SubMenu' adalah model Sequelize atau ORM lainnya
      res.status(200).json(max); // Kirim data sebagai respons JSON
    } catch (error) {
      console.error(error); // Menampilkan error secara lebih rinci
      res.status(500).json({ error: 'An error occurred while fetching data.' }); // Kirim error dengan status 500
    }
  };