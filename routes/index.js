const route = require('express').Router()
const todosroute = require('./todos-route')
const jwt=require('jsonwebtoken')

route.use('/todos',todosroute)
route.use('/',(req,res)=>{
    let password=req.body.password
    const token= jwt.sign({name:req.body.name,email:req.body.email},password)

    return res.status(200).json({token:token})
})

const Constroller = require('../controller/usercontroller')


app.post('/register',Constroller.register)
app.post('/login',Constroller.login)

module.exports=route