const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authenticate = require('../middleware/authenticate')
const checkId = require('../middleware/checkId')

router.use(authenticate)
router.post('/', TodoController.create)
router.get('/', TodoController.read)

router.get('/:id', checkId, TodoController.findById)
router.put('/:id', checkId, TodoController.updateTodo)
router.patch('/:id/status', checkId, TodoController.updateStatusTodo)
router.delete('/:id', checkId, TodoController.deleteTodo)

module.exports = router