const router = require('express').Router()

const { checkAuth, checkAdmin } = require('../middlewares/index')

const { 
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller')

router
  .get('/', getAllProducts)
  .get('/:productId', getOneProduct)
  .post('/', checkAuth, checkAdmin, createProduct)
  .put('/:productId',checkAuth, checkAdmin, updateProduct)
  .delete('/:productId', checkAuth, checkAdmin, deleteProduct)

module.exports = router