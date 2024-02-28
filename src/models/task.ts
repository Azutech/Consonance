import { Schema, model } from 'mongoose';

import { TaskTypes } from '../utils/type';
import { User } from './user';


const taskSchema = new Schema<TaskTypes>({
    userId : {
        type : String,
        ref: User
    },
    title : {
        type : String
    },
    status : {
        type : String
    },
    description : {
        type : String
    }
})

export const Task = model("User", taskSchema)