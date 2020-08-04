require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({ extended: false }))

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})