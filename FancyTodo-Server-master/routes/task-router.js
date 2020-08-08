const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/TodoController')

const { authentication, isOwner } = require('../middlewares/auth')

router.get('/', authentication, TodoController.index)
router.post('/add', authentication, TodoController.create)
router.get('/:id', authentication, isOwner, TodoController.read)
router.put('/edit/:id', authentication, isOwner, TodoController.update)
router.delete('/delete/:id', authentication, isOwner, TodoController.delete)

module.exports = router