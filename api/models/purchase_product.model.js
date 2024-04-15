const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db/index')

const PurchaseProduct = sequelize.define('purchase_product', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = PurchaseProduct