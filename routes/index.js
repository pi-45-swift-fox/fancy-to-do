const route = require('express').Router()
const Controller = require('../controllers')
// ### POST /todos
// ### GET /todos
// ### GET /todos/:id
// ### PUT /todos/:id
// ### DELETE /todos/:id
route.get('/todos',Controller.read)
route.post('/todos', Controller.create)
route.get('/todos/:id',Controller.readById)
route.put('/todos/:id', Controller.replace)
route.delete('/todos/:id', Controller.destroy)


module.exports = route