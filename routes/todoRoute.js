const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.post('/', TodoController.create)
router.get('/', TodoController.show)

router.get('/:id', TodoController.showById)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router
