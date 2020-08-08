const route = require('express').Router()
const todosroute = require('./todos-route')
 const googleController = require('../controller/googleSignIncontroller')

const emailValidation=require('../middleware/registerValidation')


route.use('/todos',todosroute)

const Constroller = require('../controller/usercontroller')


route.post('/register',emailValidation,Constroller.register)
route.post('/login',Constroller.login)


route.post('/googleSignin', googleController.googleSignin)

module.exports=route