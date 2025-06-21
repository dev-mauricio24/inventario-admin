const { DataTypes } = require('sequelize');
const sequelize = require('../database/config.js');


const inventario = sequelize.define('Inventario', {
  producto: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'inventario',
  freezeTableName: true,
  timestamps: false
});

module.exports = inventario;
