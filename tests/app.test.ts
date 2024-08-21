import request from 'supertest';
import app from '../src/app';
describe('Snake Validator API', () => {
    describe('GET /new', () => {
        it('should start a new game with valid parameters', async () => {
            const response = await request(app).get('/new?w=10&h=10');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('gameId');
            expect(response.body).toHaveProperty('width', 10);
            expect(response.body).toHaveProperty('height', 10);
            expect(response.body).toHaveProperty('score', 0);
            expect(response.body).toHaveProperty('fruit');
            expect(response.body).toHaveProperty('snake');
        });
    });
});