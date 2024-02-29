import { Request, Response } from 'express';
import { userDashboard } from '../controllers/users/users'; // Update the path to your controller function
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes'; // Assuming you're using the http-status-codes library for status codes
import { logger } from '../middlewares/logger'; // Assuming you have a logger utility

jest.mock('../models/user');
jest.mock('../middlewares/logger');
describe('User Dashboard Controller', () => {
    it('should return user data when user exists', async () => {
      // Mock user data
      const mockUser = {
        _id: 'someUserId',
        name: 'John Doe',
        email: 'john@example.com'
      };
  
      // Mocking the findOne method of the User model to return mockUser
      User.findOne = jest.fn().mockResolvedValue(mockUser);
  
      // Create mock Request and Response objects
      const req: Request = {
        query: { id: 'someUserId' } // Simulating query parameter with user ID
      } as unknown as Request;
  
      const res: Response = {
        status: jest.fn().mockReturnThis(), // Mocking status function
        json: jest.fn() // Mocking json function
      } as unknown as Response;
  
      // Call the userDashboard function
      await userDashboard(req, res);
  
      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ id: 'someUserId' }); // Ensure User.findOne() is called with the correct query parameters
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK); // Ensure res.status() is called with status OK
      expect(res.json).toHaveBeenCalledWith({ msg: 'All services data retrieved', user: mockUser }); // Ensure res.json() is called with the expected object containing user data
    });
  
    // it('should return error message when user does not exist', async () => {
    //   // Mocking the findOne method of the User model to return null (user not found)
    //   User.findOne = jest.fn().mockResolvedValue(null);
  
    //   // Create mock Request and Response objects
    //   const req: Request = {
    //     query: { id: 'someNonExistentUserId' } // Simulating query parameter with non-existent user ID
    //   } as unknown as Request;
  
    //   const res: Response = {
    //     status: jest.fn().mockReturnThis(), // Mocking status function
    //     json: jest.fn() // Mocking json function
    //   } as unknown as Response;
  
    //   // Call the userDashboard function
    //   await userDashboard(req, res);
  
    //   // Assertions
    //   expect(User.findOne).toHaveBeenCalledWith({ id: 'someNonExistentUserId' }); // Ensure User.findOne() is called with the correct query parameters
    //   expect(logger.error).toHaveBeenCalledWith('Unable to retrieve data'); // Ensure logger.error() is called with the appropriate error message
    //   expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT); // Ensure res.status() is called with status CONFLICT
    //   expect(res.json).toHaveBeenCalledWith({ error: 'Unable to retrieve data' }); // Ensure res.json() is called with the expected error message
    // });
  });
   

