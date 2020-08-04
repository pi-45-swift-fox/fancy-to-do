const express=require('express')
const { urlencoded } = require('express')
const app=express()
const port=3000
const route=require('./routes')

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/',route)

app.listen(port,()=>{
    console.log('App is listening to port: ',port)
})