import { Schema, model } from 'mongoose';

import { UserTypes } from '../utils/type';

const userSchema = new Schema<UserTypes>({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
});

export const User = model('User', userSchema);
