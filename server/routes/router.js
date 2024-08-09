const express=require('express')
const { getTasks, createTasks, getTask, editTask, deleteTask, searchTask } = require('../controller/taskController')
const { userRegister, userLogin } = require('../controller/userController')
const route=express.Router()
const jwt=require('../middleware/jwtMiddle')

route.post('/api/userRegister',userRegister)
route.post('/api/userLogin',userLogin)
route.get('/api/tasks',getTasks)
route.post('/api/tasks',jwt,createTasks)
route.get('/api/tasks/:id',jwt,getTask)
route.put('/api/tasks/:id',jwt,editTask)
route.delete('/api/tasks/:id',jwt,deleteTask)

route.get('/api/tasks_search/:search',searchTask)


module.exports=route