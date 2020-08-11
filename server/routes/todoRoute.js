const route = require('express').Router()
const TodoController = require('../controllers/TodoControl')
const authenticate = require('../middlewares/authenticate')
const checkUser = require('../middlewares/checkUser')

route.post('/', authenticate, TodoController.create)
route.get('/', authenticate, TodoController.show)
route.get('/:id', authenticate, checkUser, TodoController.getById)
route.put('/:id', authenticate, checkUser, TodoController.update)
route.delete('/:id', authenticate, checkUser, TodoController.delete)

module.exports = route