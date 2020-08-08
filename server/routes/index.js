const router = require('express').Router()
const todos = require('./todosRoutes')
const MailController = require('../controllers/MailController')
const errorHandler = require('../midlewares/errorHandler')
const User = require('./userRoutes')
const authentication = require('../midlewares/authentication')

router.get('/', (req, res) => {
    res.send(`Homepage`)
})

router.use('/', User)
router.use(authentication)
router.post('/sent', MailController.sent)
router.use('/todos', todos)

router.use(errorHandler)

module.exports = router