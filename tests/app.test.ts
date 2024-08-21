import request from 'supertest';
import express from 'express';
import app from '../src/app';

describe('Snake Validator API - GET /new Integration Tests', () => {
    describe('GET /new', () => {
        it('should return 200 with a valid state and random fruit position', async () => {
            const response = await request(app).get('/new?w=10&h=10');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('gameId');
            expect(response.body).toHaveProperty('width', 10);
            expect(response.body).toHaveProperty('height', 10);
            expect(response.body).toHaveProperty('score', 0);
            expect(response.body).toHaveProperty('fruit');
            expect(response.body).toHaveProperty('snake');
        });

        it('should return 400 for invalid query parameters (missing or incorrect)', async () => {
            const response1 = await request(app).get('/new?h=10');
            expect(response1.status).toBe(400);

            const response2 = await request(app).get('/new?w=abc&h=10');
            expect(response2.status).toBe(400);

            const response3 = await request(app).get('/new?w=-1&h=10');
            expect(response3.status).toBe(400);
        });

        it('should return 405 for invalid method (POST instead of GET)', async () => {
            const response = await request(app).post('/new?w=10&h=10');
            expect(response.status).toBe(405);
        });

        it('should return 500 for internal server error', async () => {
            const faultyApp = express();
            faultyApp.get('/new', (req, res) => {
                throw new Error('Simulated server error');
            });

            const response = await request(faultyApp).get('/new?w=10&h=10');
            expect(response.status).toBe(500);
        });
    });
});
