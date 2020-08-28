require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./Routes')
const errorHandler = require('./Middlewares/errHandler')
console.log(process.env.JWT_SECRET)

app.use(express.urlencoded({ extended:true }))
app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, ()=>{console.log(`listening to port : ${PORT}`)})