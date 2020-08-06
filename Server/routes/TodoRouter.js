const router = require('express').Router()
const Controller = require('../controller')
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, Controller.show)
router.post('/', Controller.register)

router.get('/:id', authenticate, authorize, Controller.showId)
router.put('/:id', authenticate, authorize, Controller.update)
router.delete('/delete/:id', authenticate, authorize, Controller.delete)

module.exports = router