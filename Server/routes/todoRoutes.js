const route = require('express').Router()
const TodoController = require('../Controller/TodoController')

route.post('/add', TodoController.add)
route.get('/', TodoController.show)
route.get('/:id', TodoController.showId)
route.put('/:id', TodoController.update)
route.delete('/:id', TodoController.delete)



module.exports = route