import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../../models/task';
import { logger } from '../../middlewares/logger';

export const viewTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.query;
		const task = await Task.findOne({ _id: id });
		if (!task) {
			throw new Error('Unable to retrieve data');
		}
		return res
			.status(StatusCodes.OK)

			.json({ msg: 'Task data retrieved', task });
	} catch (err: any) {
		logger.error(err.message);
		const statusMap: Record<string, number> = {
			'Unable to retrieve data': StatusCodes.CONFLICT,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};

export const AllTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.find();
		if (!task || task.length === 0) {
			throw new Error('Unable to retrieve data');
		}
		return res
			.status(StatusCodes.OK)

			.json({ msg: 'All Task data retrieved', task });
	} catch (err: any) {
		logger.error(err.message);
		const statusMap: Record<string, number> = {
			'Unable to retrieve data': StatusCodes.NOT_FOUND,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
