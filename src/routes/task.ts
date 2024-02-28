import { Router } from 'express';

import { addTask, updateTask, removeTask, viewTask, AllTask } from '../controllers/Task';

export const task : Router =  Router()


task.post('/addtask', addTask )
task.put('/updateTask', updateTask )
task.delete('/removeTask', removeTask )
task.get('/viewTask', viewTask )
task.get('/allTask', AllTask )
