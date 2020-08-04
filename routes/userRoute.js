const route = require('express').Router()
const UserController = require('../controllers/UserControl')

route.get('/users', UserController.show)
route.post('/register', UserController.register)
route.post('/login', UserController.login)

module.exports= route