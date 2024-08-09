const jwt=require('jsonwebtoken')


const jwtMiddle=async(req,res,next)=>{
    const token=req.headers.authorization
    try{
        const result=jwt.verify(token,process.env.skey)
        console.log(result);
        req.payload=result.id
        next()
    }catch(error){
        res.status(404).json(error)
    }
}
module.exports =jwtMiddle