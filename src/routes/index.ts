import { Router } from 'express';
import { auth } from './auth';
import { task } from './task';


export const routes: Router = Router();

routes.use('/auth', auth);
routes.use('/task', task);

