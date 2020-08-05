const router = require('express').Router()
const Controller = require('../controller/index')
const UserController = require('../controller/UserController')

router.get('/todos', Controller.show)
router.post('/todos', Controller.register)
router.get('/todos/:id', Controller.showId)
router.put('/todos/:id', Controller.update)
router.delete('/todos/delete/:id', Controller.delete)

router.post('/register', UserController.register)

module.exports = router