const route = require('express').Router()
const TodoController = require('../Controller/TodoController')
const authorize = require('../Middlewares/authorization')

route.post('/', TodoController.add)
route.get('/', TodoController.show)
route.get('/:id', authorize, TodoController.showId)
route.put('/:id', authorize, TodoController.update)
route.delete('/:id', authorize, TodoController.delete)

module.exports = route