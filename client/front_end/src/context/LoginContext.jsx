import React, { useState,createContext } from 'react'
export const LoginContextApi=createContext()

function LoginContext({children}) {
    const [logState,setLogState]=useState(false)
    const [logStatus,setLogStatus]=useState(false)
  return (
    <div>
        <LoginContextApi.Provider value={{logState,setLogState,logStatus,setLogStatus}}>
            {children}
        </LoginContextApi.Provider>
    </div>
  )
}

export default LoginContext