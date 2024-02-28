import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../../models/task';
import { logger } from '../../middlewares/logger';

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Assuming the task ID is passed as a parameter in the URL
        const { title, description, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });

        if (!updatedTask) {
            throw new Error('Task not found');
        }

        return res.status(StatusCodes.OK).json({
            msg: 'Task updated successfully',
            task: updatedTask,
        });
    } catch (err: any) {
        logger.error(err.message);
        const statusMap: Record<string, number> = {
            'Task not found': StatusCodes.NOT_FOUND,
        };

        const statusCode =
            statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({ error: err.message });
    }
};