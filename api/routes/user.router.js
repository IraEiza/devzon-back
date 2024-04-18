const router = require('express').Router()

const { checkAuth } = require('../middlewares/index')

const {
  getUserByToken
} = require('../controllers/user.controller')

router
  .get('/token', checkAuth, getUserByToken)

module.exports = router