const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/TodoController')
const userRouter = require('./user-router')
const taskRouter = require('./task-router')

router.get('/weather', TodoController.weather)

router.use('/user', userRouter)
router.use('/task', taskRouter)

module.exports = router