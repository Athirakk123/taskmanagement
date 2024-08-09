import React, { createContext, useState } from 'react'
export const RefreshContextApi=createContext()

function RefreshContext({children}) {
    const [refresh,setRefresh]=useState('')
  return (
    <div>
        <RefreshContextApi.Provider value={{refresh,setRefresh}}>
            {children}
        </RefreshContextApi.Provider>
    </div>
  )
}

export default RefreshContext