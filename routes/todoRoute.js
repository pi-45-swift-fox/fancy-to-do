const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authenticate = require('../middleware/authenticate')
const checkId = require('../middleware/checkId')

router.use(authenticate)
router.post('/', TodoController.create)
router.get('/', TodoController.read)

// router.use(checkId)
router.get('/:id', checkId, TodoController.findById)
router.put('/:id', checkId, TodoController.updateTodo)
router.delete('/:id', checkId, TodoController.deleteTodo)

module.exports = router