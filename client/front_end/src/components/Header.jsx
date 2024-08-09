import React, { useContext, useEffect, useState } from 'react'
import'../styles/Header.css'
import { LoginContextApi } from '../context/LoginContext'
import { Link } from 'react-router-dom'


function Header() {
  const {logState,setLogStatus,logStatus}=useContext(LoginContextApi)
  const [userName,setUserName]=useState('')
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setLogStatus(true)
      setUserName(sessionStorage.getItem('username'))
    }
  },[logStatus])
  const handleLogOut=()=>{
    setLogStatus(false)
    sessionStorage.clear()
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-info" style={{height:"90px"}}>
  <div className="container-fluid">

    <a className="navbar-brand text-primary ps-5" href="#"><h2 style={{color:"blueviolet"}}>Tasks</h2></a>
    {
      logState?<></>
      :
      <div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse m-5" id="navbarSupportedContent"  >
      {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"  >
        <li className="nav-item" style={{alignItems:"center"}}   >
          <a className="nav-link active" aria-current="page" href="#" style={{color:"blue"}}>Home</a>
        </li>
        <li className="nav-item" >
          <a className="nav-link active" aria-current="page" href="/about" style={{color:"blue"}}>About</a>
        </li>
        <li className="nav-item" >
          <a className="nav-link active" aria-current="page" href="/contact" style={{color:"blue"}}>Contacts</a>
        </li>
        
        
      </ul> */}
      <div className="d-flex">
       
        {
          logStatus?
          <div className='d-flex align-items-center'>
            <span className='mx-3 d-inline-flex'><i className='fa fa-user'></i>{userName}</span>
       <Link to={'/'} className="btn btn-outline-success " type="submit" onClick={handleLogOut}>LogOut</Link>
       </div>:
       <Link to={'/login'} className="btn btn-outline-success " type="submit">Login</Link>
        }
       
      </div>
    </div>
  </div>
    }
 </div>  
</nav>
 </>     
  )
}

export default Header