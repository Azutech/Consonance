import { Router } from 'express';
import { auth } from './users';

export const routes: Router = Router();

routes.use('/auth', auth);