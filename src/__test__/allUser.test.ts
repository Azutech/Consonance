import { Request, Response } from 'express';
import { AllUser } from '../controllers/users/users'; // Update the path to your controller function
import { User } from '../models/user';

jest.mock('../models/user');

describe('User Controller', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: "Eretr23@"
        },
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: "Sdferf@12"
        }
      ];

      // Mocking the find method of the User model to return mockUsers
      User.find = jest.fn().mockResolvedValue(mockUsers);

      // Create mock Request and Response objects
      const req: Request = {} as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(), // Mocking status function
        json: jest.fn() // Mocking json function
      } as unknown as Response;

      await AllUser(req, res);

      expect(User.find).toHaveBeenCalled(); // Ensure User.find() is called
      expect(res.json).toHaveBeenCalledWith({ msg: 'All services data retrieved', user: mockUsers }); // Ensure res.json() is called with the expected object
    });
  });
});
