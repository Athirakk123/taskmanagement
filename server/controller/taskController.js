const tasks=require('../models/taskModel')





exports. createTasks=async(req,res)=>{
    const{title,description}=req.body
   
    const userId=req.payload
    try{
        if(!title||!description){
            res.status(406).json("all fields are required")
        }
        else{
          const newTask=new tasks({userId,title,description}) 
          await  newTask.save()
          res.status(200).json('successfully created')
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}
exports. editTask=async(req,res)=>{
    const {id}=req.params
    const{title,description}=req.body

    const userId=req.payload
    //console.log(req.body);
    try{
        const existingTask=await tasks.findByIdAndUpdate({_id:id},{userId,title,description},{new:true})
          res.status(200).json(existingTask)
          console.log(existingTask);
    }catch(error){
        res.status(404).json(error)
    }
    
}

exports.getTasks=async(req,res)=>{
    try{
        const result=  await tasks.find().populate('userId')
        res.status(200).json(result)
    }
   catch(error){
    res.status(404).json(error)
   }
}

exports.getTask=async(req,res)=>{
    try{
        const {id}=req.params
        const result=  await tasks.findOne({_id:id}).populate('userId')
        res.status(200).json(result)
    }
   catch(error){
    res.status(404).json(error)
   }
}
exports.deleteTask=async(req,res)=>{
    try{
        const {id}=req.params
        const result=  await tasks.findOneAndDelete({_id:id})
        res.status(200).json(result)
    }
   catch(error){
    res.status(404).json(error)
   }
}
exports.searchTask =async(req,res)=>{
    const {search}=req.params
    try {
        const query = {
            title:{$regex:search,$options:"i"}
        }
        const result = await tasks.find(query)
        if (result) {
            res.status(200).json(result)
        } else {
            result.status(401).json("no users")
        }
    } catch (error) {
        res.status(404).json(error.message)
    }
}
