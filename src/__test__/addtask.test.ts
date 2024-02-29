import { Request, Response } from 'express';
import { addTask } from '../controllers/Task'; // Update the path to your controller function
import { Task } from '../models/task';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../middlewares/logger';

jest.mock('../models/task');
jest.mock('../models/user');
jest.mock('../middlewares/logger');

describe('Task Controller - addTask', () => {
    it('should create a new task', async () => {
      // Mock user data, request body, and user ID
      const mockUser = {
        _id: 'someUserId',
        name: 'John Doe',
        email: 'john@example.com'
      };
      const mockReqBody = {
        title: 'Sample Task',
        status: 'pending',
        description: 'This is a sample task description'
      };
      const mockUserId = 'someUserId';
  
      // Mock User.findById to return user document
      User.findById = jest.fn().mockResolvedValue(mockUser);
  
      // Mock new task document
      const mockNewTask = {
        _id: 'someTaskId',
        userId: mockUser._id,
        ...mockReqBody
      };
  
      // Mock Task model's save method
      Task.prototype.save = jest.fn().mockResolvedValue(mockNewTask);
  
      // Create mock Request and Response objects
      const req: Request = {
        query: { id: mockUserId },
        body: mockReqBody
      } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
  
      // Call addTask function
      await addTask(req, res);
  
      // Assertions
      expect(User.findById).toHaveBeenCalledWith(mockUserId);
      expect(Task.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Task Created', newTask: mockNewTask }); // Ensure newTask is correctly set in the response
    });
  
    it('should return error message when unable to create task', async () => {
      // Mock user ID
      const mockUserId = 'someUserId';
  
      // Mock Request and Response objects
      const req: Request = {
        query: { id: mockUserId },
        body: {
          title: 'Sample Task',
          status: 'pending',
          description: 'This is a sample task description'
        }
      } as unknown as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
  
      // Mock User.findById to return user document
      User.findById = jest.fn().mockResolvedValue({ _id: 'someUserId' });
  
      // Mock Task model's save method to throw error
      Task.prototype.save = jest.fn().mockRejectedValue(new Error('Unable to create Task'));
  
      // Call addTask function
      await addTask(req, res);
  
      // Assertions
      expect(User.findById).toHaveBeenCalledWith(mockUserId);
      expect(Task.prototype.save).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith('Unable to create Task');
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR); // Ensure the correct status code is set
      expect(res.json).toHaveBeenCalledWith({ error: 'Unable to create Task' });
    });
  });

  
