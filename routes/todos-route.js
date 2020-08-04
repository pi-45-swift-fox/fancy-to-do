const route = require('express').Router()
const Constroller = require('../controller/todoscontroller')

route.post('/',Constroller.postData)
route.get('/',Constroller.readData)
route.get('/:id',Constroller.readById)
route.put('/:id',Constroller.update)
route.delete('/:id',Constroller.del)
route.post('/register',Constroller.register)
route.post('/login',Constroller.login)


module.exports=route