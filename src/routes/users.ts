import { Router } from 'express';

import { userDashboard, AllUser } from '../controllers/users/users';

export const user : Router =  Router()

user.get('/alluser', AllUser)
user.get('/alluser', userDashboard)