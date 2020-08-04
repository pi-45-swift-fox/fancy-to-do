const router = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const thirdParty = require('./thirdPartyAPI')
router.use('/todos', todoRoute)
router.use('/', userRoute)
router.use('/randomfacts', thirdParty)

module.exports = router