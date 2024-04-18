const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db/index')

const Purchase = sequelize.define('purchase', {
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }, 
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  }
})

module.exports = Purchase