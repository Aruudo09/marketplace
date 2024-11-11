const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.ENUM('Y', 'N'),
      allowNull: true,
    },
    app: {
      type: DataTypes.ENUM('N', 'Y'),
      allowNull: true,
    },
  }, {
    tableName: 'tbl_user',  // explicitly set the table name
    timestamps: true, // if you want createdAt and updatedAt columns
  });
  
  module.exports = User;