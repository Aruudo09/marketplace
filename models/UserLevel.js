const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserLevel = sequelize.define('UserLevel', {
    id_level: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Menambahkan auto_increment
      allowNull: false,
    },
    nama_level: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'tbl_userlevel',  // explicitly set the table name
    timestamps: false, // if you want createdAt and updatedAt columns
  });
  
  module.exports = UserLevel;