const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandlers')

app.use(express.urlencoded({extended:true}))
app.use(routes)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`listening to port: ${PORT}`)
})