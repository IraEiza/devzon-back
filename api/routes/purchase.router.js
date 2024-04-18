const router = require('express').Router()

const { checkAuth, checkAdmin } = require('../middlewares/index')

const { 
  getAllPurchases,
  getOnePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  getMyPurchases
} = require('../controllers/purchase.controller')

router
  .get('/', checkAuth, checkAdmin, getAllPurchases)
  .get('/own', checkAuth, getMyPurchases)
  /* .get('/:purchaseId', checkAuth, getOnePurchase) */
  .post('/', checkAuth, createPurchase)
  /* .put('/:productId',checkAuth, checkAdmin, updatePurchase)
  .delete('/:productId', checkAuth, checkAdmin, deletePurchase) */

module.exports = router