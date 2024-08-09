import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginContextApi } from './LoginContext'



export const HeaderContextApi=createContext()
function HeaderContext({children}) {
    const [header,setHeader]=useState('')

    const {logStatus}=useContext(LoginContextApi)
    useEffect(()=>{
        const head={
            "authorization":`${sessionStorage.getItem('token')}`,
            "content-type":"application/json"
        }
        setHeader(head)
    },[logStatus])
  return (
   <>
   <HeaderContextApi.Provider value={{header}}>
    {children}
   </HeaderContextApi.Provider>
   
   </>
  )
}

export default HeaderContext