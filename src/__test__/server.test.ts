import supertest from 'supertest';
import app from '../index';

describe('Tests server connection', () => {
    it('expects server to be running', async () => {
        const request = supertest(app);
        const response = await request.get('/');
        
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining({
            message: "Welcome To Consonance Server 🚀🚀"
        }));
    });
});

