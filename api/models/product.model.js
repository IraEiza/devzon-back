const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db/index')

const Product = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  }, 
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    defaultValue: "https://agrimart.in/uploads/vendor_banner_image/default.jpg"
  }
})

module.exports = Product