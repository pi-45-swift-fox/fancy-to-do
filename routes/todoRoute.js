const route = require('express').Router()
const TodoControl = require('../controllers/TodoControl')

route.post('/', TodoControl.create)
route.get('/', TodoControl.show)
route.get('/:id', TodoControl.getById)
route.put('/:id', TodoControl.update)
route.delete('/:id', TodoControl.delete)

module.exports = route