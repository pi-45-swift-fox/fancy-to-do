require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const routes = require('./routes')
const errorHandler = require('./middlewares/erroHandler')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('welcome')
})
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`)
})
