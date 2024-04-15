const router = require('express').Router()

//const { checkAuth, checkAdmin } = require('../middlewares/index')

const { 
  /* getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser */
} = require('../controllers/user.controller')

router
  /* .get('/profile/:userId', getAllUsers)
  .get('/:userId', getOneUser)
  .post('/', checkAuth, checkAdmin, createUser)
  .put('/:userId',checkAuth, checkAdmin, updateUser)
  .delete('/:userId', checkAuth, checkAdmin, deleteUser) */

module.exports = router