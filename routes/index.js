const route = require('express').Router()
const todosroute = require('./todos-route')
const jwt=require('jsonwebtoken')
const isUniqueEmail=require('../middleware/uniqueemail')
route.use('/todos',todosroute)
// route.use('/',(req,res)=>{
//     let password=req.body.password
//     const token= jwt.sign({name:req.body.name,email:req.body.email},password)

//     return res.status(200).json({token:token})
// })

const Constroller = require('../controller/usercontroller')


route.post('/register',isUniqueEmail,Constroller.register)
route.post('/login',Constroller.login)

module.exports=route