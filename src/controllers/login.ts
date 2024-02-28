import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { hashPassword } from '../utils/hashpassword';
import { validatePassword } from '../utils/validatePassword';

export const login = async (req: Request, res: Response) => {};
