const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({

title:{
    type:String,
    required:true
},

description:{
    type:String,
    required:true
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
}


    
})

const tasks=mongoose.model('tasks',taskSchema)
module.exports=tasks