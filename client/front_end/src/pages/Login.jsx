import React, { useContext, useEffect, useState } from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userLogin } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { LoginContextApi } from '../context/LoginContext'

function Login() {
  const {setLogState,setLogStatus}=useContext(LoginContextApi)
  useEffect(()=>{
      setLogState(true)
  },[])
  
  
  const navigate=useNavigate()
  const [data,setData]=useState({email:'',password:''})
  const handleSubmit=async()=>{
    const {email,password}=data
    if(!email,!password){
      toast.error('all field are required')
    }
    else{
      const result=await userLogin(data)
      console.log(result);
      if(result.status==200){
        setLogState(false)
        setLogStatus(true)
        toast.success("login successful")
        setData({email:'',password:''})
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("username",result.data.existingUser.userName)
        sessionStorage.setItem("id",result.data.existingUser._id)
        navigate('/')
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
         <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png?f=webp" className="img-fluid" style={{width:" 250px;"}}/>
        </div>
        <p className="text-white fs-2" >Be Verified</p>
        <small className="text-white text-wrap text-center" style={{width: "17rem"}}>Join experienced Designers on this platform.</small>
    </div> 
 
     
    <div className="col-md-6 right-box">
       <div className="row align-items-center">
             <div className="header-text mb-4">
                  <h2>Hello,Again</h2>
                  <p>We are happy to have you back.</p>
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
                 <button className="btn btn-lg btn-primary w-100 fs-6" onClick={handleSubmit}>Login</button>
             </div>
            
             <div className="row">
                 <small>Don't have account? <Link to={'/register'} >Sign Up</Link></small>
             </div>
       </div>
    </div> 
   </div>
 </div>
  )
}
export default Login