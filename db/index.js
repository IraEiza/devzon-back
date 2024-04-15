require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  logging: false,
  define: {
    timestamps: false
  }
})

async function checkDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection successful!!')
  } catch (error) {
    console.log(error)
  }
}

async function syncModels() {
  try {
    await sequelize.sync()
    console.log('Models Syncronized!!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sequelize,
  checkDB,
  syncModels
}