const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Menu = sequelize.define('Menu', {
  id_menu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Menambahkan auto_increment
    allowNull: false,
  },
  nama_menu: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  urutan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.ENUM('Y', 'N'),
    allowNull: false,
  },
}, {
  tableName: 'tbl_menu',  // explicitly set the table name
  timestamps: false, // No need for createdAt or updatedAt columns
});

module.exports = Menu;