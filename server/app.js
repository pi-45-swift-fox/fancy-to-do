require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3002
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})