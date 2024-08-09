import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { deleteTask, getTask, updateTask } from '../services/allApi';
import { HeaderContextApi } from '../context/HeaderContext';
import { toast } from 'react-toastify';
import { RefreshContextApi } from '../context/RefreshContext';
import { LoginContextApi } from '../context/LoginContext';

function ViewTask({id}) {
  const {header} = useContext(HeaderContextApi)
  const {setRefresh} = useContext(RefreshContextApi)
  const {logStatus}=useContext(LoginContextApi)
    const [data, setData]= useState([])
    const [show, setShow] = useState(false);
    const [update,setUpdate]=useState([])
    const [user,setUser]=useState("")
    const [edit, setEdit] = useState(false);
    const handleClose = () => setShow(false);
    useEffect(()=>{
      setUser(sessionStorage.getItem('id'))

    },[])
    console.log(user);
    const handleShow = async() => {
      if(logStatus){
        setShow(true)
        const result = await getTask(id,header)
        setData(result.data)
        setUpdate({title:result.data.title,description:result.data.description})
       console.log(result.data);
      }
       else{
        toast.warning("login please")
       }
       
        
    }

    const handleDelete =async()=>{
      const result = await deleteTask(id,header)
      if (result.status==200) {
        setRefresh(result.data)
        toast.success("deleted")
        handleClose()
      } else {
        console.log(result.response.data);
        
      }
    }
    const handleUdate=async()=>{
      const {title,description}=update
      if(!title||!description){
        toast.warning("all fields are required")
      }
      else
      {
        const result=await updateTask(update,id,header)
        if(result.status==200){
        handleClose()
        setData("")
        setUpdate("")

        setRefresh(result.data)
        toast.success("updated successfully")
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
    
  return (
    <div>
        
            <button className="btn btn-outline-primary" onClick={handleShow}><i className='fa fa-eye'></i> view</button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Task Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <div className="card" style={{width:"100%"}}>
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text m-0">Created by-{data.userId?.userName}</p>
                    <p className="card-text m-0">User email-{data.userId?.email}</p>
                    <p className="card-text m-0">Description- {data.description}</p>
                    {
                      data.userId?._id==user?
                    
                    <div className='button-group my-2 '>
                      <button className="btn btn-outline-success mx-2" onClick={()=>{setEdit(true)}}><i className='fa fa-pen'></i> edit</button>
                    
                    <button className="btn btn-outline-danger mx-2"onClick={handleDelete}><i className='fa fa-trash' ></i> delete</button>
                   </div>:
                   
                    <button className="btn btn-outline-danger mx-2"><i className='fa fa-cancel'></i> cancel</button>
                    }
                    </div>
                  </div>
                
                    {
                        edit?
                    <div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" value={update.title}
                        onChange={(e)=>{setUpdate({...update,title:e.target.value})}}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="description" className='mb-3' >
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            value={update.description}
                            onChange={(e)=>{setUpdate({...update,description:e.target.description})}}
                        />
                    </FloatingLabel>
                    <div className='d-flex justify-content-around'>
                    <button className="btn btn-outline-success" onClick={handleUdate}><i className='fa fa-thumbs-up'></i> update</button>
                    <button className="btn btn-outline-danger" onClick={()=>{setEdit(false)}}><i className='fa fa-cancel'></i> cancel </button>
                    </div>
                    </div>:
                    <></>
                    }
                </Offcanvas.Body>
            </Offcanvas>
    </div>
  )
}

export default ViewTask