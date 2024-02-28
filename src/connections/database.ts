import mongoose from 'mongoose';
import {config} from 'dotenv';
import { logger } from '../middlewares/logger';

config();

mongoose.set('debug', false);

const uri = process.env.DATABASE_URI!;

export const database = async () => {
	await mongoose
		.connect(uri)
		.then(() => {
			logger.info('Connected to Consonance Database');
		})
		.catch((err) => {
			logger.error(`Error connecting to the database. n${err}`);
			process.exit(1);
		});
};

export default database;