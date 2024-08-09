const mongoose=require('mongoose')
const connect=process.env.mongo

mongoose.connect(connect).then(()=>{
    console.log("connection successful")
}).catch(err=>{console.log(err);})