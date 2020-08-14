const router = require('express').Router()
const todosRoutes = require('./todos')
const userRoutes = require('./user')
const qrcodeRoutes = require('./qrcode')


router.use('/qrcode',qrcodeRoutes)
router.use('/todos', todosRoutes)
router.use('/user', userRoutes)

module.exports = router

