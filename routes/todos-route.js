const route = require('express').Router()
const Constroller = require('../controller/todoscontroller')
const authentication=require('../middleware/authentication')
const authorization=require('../middleware/authorization')


route.post('/',authentication,Constroller.postData)
route.get('/',authentication,Constroller.readData)
route.get('/:id',authentication,authorization,Constroller.readById)
route.put('/:id',Constroller.update)
route.delete('/:id',Constroller.del)



module.exports=route