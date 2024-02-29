import { Request } from 'express';



export interface UserTypes {
	name: string;
	email: string;
	password: string;
}

export interface TaskTypes {
	title: string;
	description: string;
	status: string;
	userId: string;
}


export interface CustomRequest extends Request {
	user?: any;
}