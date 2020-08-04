const router = require('express').Router()
const todos = require('./todo')


router.use('/todos',todos)

module.exports = router;