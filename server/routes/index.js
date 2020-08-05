const route = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middleware/authentication')
const checkOwner = require('../middleware/authorization')


route.get('/todos',authentication, Controller.read)
route.post('/todos', authentication, Controller.create)
route.get('/todos/:id',authentication, checkOwner, Controller.readById)
route.put('/todos/:id', authentication,checkOwner, Controller.replace)
route.delete('/todos/:id', authentication,checkOwner, Controller.destroy)
route.post('/register', Controller.registrasi)
route.post('/login', Controller.login)
route.post('/getworkday', Controller.workday)


module.exports = route