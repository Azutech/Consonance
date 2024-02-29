import { Request, Response } from 'express';
import { regUser } from '../controllers/Auth/registerUser';
import { User } from '../models/user';
import mongoose from 'mongoose';

jest.mock('../models/user');

describe('User Controller', () => {
	describe('createUser', () => {
		it('should create a new user', async () => {
			const mockUser = {
				name: 'John Doe',
				email: 'john@example.com',
				password: 'Eretr23@',
			};

			// Create a mock Request object
			const req: Request = {
				body: {
					name: 'John Doe',
					email: 'john@example.com',
					password: 'Eretr23@',
				},
			} as Request;

			// Create a mock Response object
			const res: Response = {
				status: jest.fn().mockReturnThis(), // Mocking status function
				json: jest.fn(), // Mocking json function
			} as unknown as Response;

			User.prototype.save = jest.fn().mockResolvedValue(mockUser);

			await regUser(req, res);

			expect(res.status).toHaveBeenCalledWith(201); // Assuming you expect status 201 for successful user creation
			expect(res.json).toHaveBeenCalledWith({
				msg: 'User created successfully',
			}); // Assuming you send this response on successful user creation
		});
	});

	// Write similar tests for other controller functions
});
