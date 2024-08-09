require('dotenv').config()



const express=require('express')
const cors=require('cors')
require('./db/connection')
const route=require('./routes/router')
const port=3000

const app=express()

app.use(cors())
app.use(express.json())
app.use(route)

app.listen(port,()=>{
    console.log("running in 3000");
})

