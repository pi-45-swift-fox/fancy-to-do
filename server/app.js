require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
