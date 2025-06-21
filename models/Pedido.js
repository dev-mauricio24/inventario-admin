const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');


const Pedido = sequelize.define('Pedido', {
  cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente'
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;
