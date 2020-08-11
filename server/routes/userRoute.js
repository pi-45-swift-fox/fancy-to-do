const route = require('express').Router()
const UserController = require('../controllers/UserControl')
const ThirdParty = require('../controllers/thirdParty')

// route.get('/users', UserController.show)
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)
route.get('/sholat', ThirdParty.sholatTime)

module.exports= route