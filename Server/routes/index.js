const route = require('express').Router()
const todoRoutes = require('./todoRoutes')
const UserController = require('../Controller/UserController')
const authenticate = require('../Middlewares/authenticate')

route.get('/', (req,res)=>{
    res.send('123')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use(authenticate)
route.use('/todos', todoRoutes)

module.exports = route