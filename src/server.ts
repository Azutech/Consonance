import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';

config();

export const server: Application = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json('Welcome To Consonance Server 🚀🚀');
});

server.get('*', (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});
