require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const router = require('./routes')
const cors = require('cors')
const { errorHandler }  = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`listen on http://localhost:${PORT}`)
})