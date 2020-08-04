const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const authorization = require('../midlewares/authorization')

router.get('/', TodoController.list)
router.post('/', TodoController.create)
router.get('/:id', TodoController.findOne)
router.put('/:id', authorization, TodoController.edit)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router