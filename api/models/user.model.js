const { DataTypes } = require('sequelize')
const { sequelize } = require('../../db/index')

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }, 
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  address: {
    type: DataTypes.STRING
  }
})

module.exports = User