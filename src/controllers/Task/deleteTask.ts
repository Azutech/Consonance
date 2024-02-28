import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../../models/task';
import { logger } from '../../middlewares/logger';


export const removeTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.query;

		const destroyTask = await Task.findOneAndDelete({ _id: id });

		if (!destroyTask) {
			throw new Error('Unable to delete data');
		}

		return res.status(StatusCodes.OK).json({
            msg: 'Task deleted successfully'
        });
	} catch (err: any) {
        logger.error(err.message);
		const statusMap: Record<string, number> = {
			'Unable to delete data': StatusCodes.CONFLICT,
		};

		const statusCode =
			statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
		return res.status(statusCode).json({ error: err.message });
    }
};
