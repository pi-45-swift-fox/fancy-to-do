const router = require('express').Router()
const UserController = require('../controller/UserController')
const authenticate = require('../middlewares/authenticate')
const todoRoutes = require('./TodoRouter')
const ThirdPartyAPI = require('../controller/thirdPartyApi')


router.get('/tes', ThirdPartyAPI.anime)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authenticate)
router.use('/todos', todoRoutes)


module.exports = router