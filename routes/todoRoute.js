const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/', TodoController.create)
router.get('/', TodoController.read)
router.get('/:id', TodoController.findById)
router.put('/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router