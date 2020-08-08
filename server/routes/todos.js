const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const {authentication,authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/', TodoController.read)
router.post('/', TodoController.create)
router.get('/:id',TodoController.getEdit)
// router.use(authorization)
router.delete('/:id',authorization, TodoController.delete)
router.put('/:id',authorization, TodoController.update)

module.exports = router