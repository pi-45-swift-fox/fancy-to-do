const router = require('express').Router()
const todoRouter = require('./todoRoute')
const UserController = require('../controllers/UserController')
const Middleware = require('../middlewares/Middleware')

router.post('/register', UserController.register)
router.post('/login', UserController.logIn)

router.use('/todos', Middleware.authentication, todoRouter)

module.exports = router
