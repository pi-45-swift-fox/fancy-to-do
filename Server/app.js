const express=require('express')
const app=express()
const port=3000
var cors=require('cors')
const route=require('./routes')
const errorHandler=require('./middleware/errror-handling')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',route)
app.use(errorHandler)

app.listen(port,()=>{
    console.log('App is listening to port: ',port)
})