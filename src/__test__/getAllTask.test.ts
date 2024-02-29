import { Request, Response } from 'express';
import { AllTask } from '../controllers/Task'; // Update the path to your controller function
import { Task } from '../models/task';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../middlewares/logger';

jest.mock('../models/task');
jest.mock('../middlewares/logger');

describe('Task Controller - AllTask', () => {
  it('should return all tasks', async () => {
    // Mock tasks
    const mockTasks = [
      { _id: 'task1Id', title: 'Task 1', status: 'pending', description: 'Description 1', userId: 'XXXXXX'},
      { _id: 'task2Id', title: 'Task 2', status: 'completed', description: 'Description 2',  userId: "xxxxx"},
    ];

    // Mock Task.find() method to return tasks
    Task.find = jest.fn().mockResolvedValue(mockTasks);

    // Create mock Request and Response objects
    const req: Request = {} as Request;
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Call AllTask function
    await AllTask(req, res);

    // Assertions
    expect(Task.find).toHaveBeenCalled(); // Ensure Task.find() is called
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK); // Ensure res.status() is called with status OK
    expect(res.json).toHaveBeenCalledWith({ msg: 'All Task data retrieved', task: mockTasks }); // Ensure res.json() is called with the expected tasks
  });

  it('should return error message when unable to retrieve tasks', async () => {
    // Mock error message
    const errorMessage = 'Unable to retrieve data';

    // Mock Task.find() method to throw error
    Task.find = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Create mock Request and Response objects
    const req: Request = {} as Request;
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    // Call AllTask function
    await AllTask(req, res);

    // Assertions
    expect(Task.find).toHaveBeenCalled(); // Ensure Task.find() is called
    expect(logger.error).toHaveBeenCalledWith(errorMessage); // Ensure logger.error() is called with the appropriate error message
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage }); // Ensure res.json() is called with the expected error message
  });
});
