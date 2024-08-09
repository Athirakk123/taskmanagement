import React, { useState } from 'react'
import '../styles/Register.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userRegister } from '../services/allApi'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate=useNavigate()
  const [data,setData]=useState({userName:'',email:'',password:''})
  const handleSubmit=async()=>{
    const {userName,email,password}=data
    if (!userName|!email|!password) {
      toast.error("all fields are required")
    }
    else{
      const result=await userRegister(data)
      console.log(result);
      if(result.status==200){
        toast.success(result.data)
        navigate('/login')
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
   
    <div className="row border rounded-5 p-3 bg-white shadow box-area">

    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: "#103cbe;"}}>
        <div className="featured-image mb-3">
         <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-6333618-5230178.png?f=webp" className="img-fluid" style={{width:" 250px;"}}/>
        </div>
        <p className="text-white fs-2" >Be Verified</p>
        <small className="text-white text-wrap text-center" style={{width: "17rem"}}>Join experienced Designers on this platform.</small>
    </div> 
 
     
    <div className="col-md-6 right-box">
       <div className="row align-items-center">
             <div className="header-text mb-5">
                  <h3 className='head'>Sign Up </h3><span className='head2'>Starts with tasks...</span>
                  
             </div>
             <div className="input-group mb-3">
                 <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Username" onChange={(e)=>{
                  setData({...data,userName:e.target.value})
                 }}/>
             </div>
             <div className="input-group mb-3">
                 <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" onChange={(e)=>{
                  setData({...data,email:e.target.value})
                 }}/>
             </div>
             <div className="input-group mb-1">
                 <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" onChange={(e)=>{
                  setData({...data,password:e.target.value})
                 }}/>
             </div>
             <div className="input-group mb-5 d-flex justify-content-between">
                 
                 
                 
             </div>
             <div className="input-group mb-3">
                 <button className="btn btn-lg btn-primary w-100 fs-6" onClick={handleSubmit}>Sign Up</button>
             </div>
            
             <div className="row">
                 <small>Don't have account? <Link to={'/login'}> Login</Link></small>
             </div>
       </div>
    </div> 
   </div>
 </div>
  )
}

export default Register