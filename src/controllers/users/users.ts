import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../models/user';

export const AllUser = async (req: Request, res: Response) => {
	try {
		const user = await User.find();
		if (!user) {
			throw new Error('Unable to retrieve data');
		}
		return res
			.status(StatusCodes.OK)

			.json({ msg: 'All services data retrieved', user });
	} catch (err: any) {}
};
export const userDashboard = async (req: Request, res: Response) => {
	try {
		const { id } = req.query;
		const user = await User.findOne({ id });
		if (!user) {
			throw new Error('Unable to retrieve data');
		}
		return res
			.status(StatusCodes.OK)

			.json({ msg: 'All services data retrieved', user });
	} catch (err: any) {}
};
