import supertest from 'supertest'
import mongoose  from 'mongoose';
import {server} from '../server'

// const app  = require('./app'); // Assuming your Express app is in a file named 'app.js'
// const User = require('./models/user'); // Assuming the User model is defined in 'models/user.js'
// const Task = require('./models/task'); // Assuming the Task model is defined in 'models/task.js'

// Connect to a test database before running any tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
});


// Disconnect from the test database after running all tests
afterAll(async () => {
  await mongoose.connection.close();
});


describe('Tests server connection', () => {
    it('it expects server to be running', async () => {
        const request = supertest(server)
        const response = await request.get('/')
        expect(response.status).toEqual(200)
        expect(response.body.message).toBe(
            'Welcome to Swift-Spur \n Lets solve your financial problems'
        )
    })
})