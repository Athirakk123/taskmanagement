const users=require('../models/usermodel')

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


exports.userRegister=async(req,res)=>{
    const {userName,email,password}=req.body
    console.log(userName,email,password);
    const hashpassword=bcrypt.hashSync(password,10)

 try{
    const existingUser=await users.findOne({email})
 if(existingUser){
    res.status(406).json("user alredy exist")
 }
else{
    
    const newUser=new users({
        userName,
        email,
        password:hashpassword
    })
    await newUser.save()
    res.json("signup successfully")

}
 }
 catch(error){
    console.log(error);

 }


}
exports.userLogin=async(req,res)=>{
    const {email,password}=req.body
    const existingUser= await users.findOne({email})
    console.log(existingUser);
    if(existingUser){
     const result=   bcrypt.compareSync(password,existingUser.password)
     if(result){
      const token=jwt.sign({id:existingUser._id},process.env.skey)  
        res.status(200).json({token,existingUser})
     }
     else{
        res.json("invalid password")
     }

    }
    else{
    res.json("user not found")
    }
   }