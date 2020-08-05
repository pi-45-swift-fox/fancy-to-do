const router = require('express').Router()
const Controller = require('../controller')
const authorize = require('../middlewares/authorize')

router.get('/', Controller.show)
router.post('/', Controller.register)

router.get('/:id', authorize, Controller.showId)
router.put('/:id', authorize, Controller.update)
router.delete('/delete/:id', authorize, Controller.delete)

module.exports = router