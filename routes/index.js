const router = require('express').Router()
const todoRouter = require('./todoRoute')

router.use('/todos', todoRouter)

module.exports = router
