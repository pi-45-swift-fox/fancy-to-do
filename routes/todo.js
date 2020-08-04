const router = require('express').Router()
const Controller = require('../controllers/TodoController')

router.post('/',Controller.create)
router.get('/',Controller.findAll)
router.get('/:id',Controller.findOne)
router.put('/:id',Controller.update)
router.delete('/:id',Controller.destroy)

module.exports = router;