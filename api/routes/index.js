const router = require('express').Router()

const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const productRouter = require('./product.router')
const purchaseRouter = require('./purchase.router')

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/purchases', purchaseRouter)

module.exports = router