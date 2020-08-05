const express=require('express')
const { urlencoded } = require('express')
const app=express()
const port=3000
const route=require('./routes')
const errorHandler=require('./middleware/errror-handling')

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/',route)
app.use(errorHandler)

app.listen(port,()=>{
    console.log('App is listening to port: ',port)
})