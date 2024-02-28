import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { logger } from '../../middlewares/logger';

export const addTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.query;

		const { title, status, description } = req.body;

		const checkuser = await User.findById(id);
		if (!checkuser || checkuser === null) {
			throw new Error('User does not Exist');
		}

		const newTask = new Task({
			userId: checkuser._id,
			title,
			status,
			description,
		});

		if (!newTask) {
			throw new Error('Unable to create User');
		}

		return res
			.status(StatusCodes.CREATED)
			.json({ msg: 'Task Created', newTask });
	} catch (err: any) {
		logger.error(err.message);
		const statusMap: Record<string, number> = {
			'User does not Exist': StatusCodes.CONFLICT,
			'Unable to create User': StatusCodes.BAD_REQUEST,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
	}
};
