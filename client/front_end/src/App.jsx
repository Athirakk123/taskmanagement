import react from 'react'

import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Header from './components/Header'




function App() {
  

  return (
    <>
    <Header/>
     <Routes>
     
      <Route path=""  element={<Dashboard/>}/>
      <Route path="register"  element={<Register/>}/>
      <Route path="login"  element={<Login/>}/>
   
     </Routes>
     <ToastContainer />
    </>
  )
}

export default App
