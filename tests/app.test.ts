import request from 'supertest';
import express from 'express';
import app from '../src/app';
import { State } from '../src/types';

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

describe('Snake Validator API - POST /new Integration Tests', () => {

    describe('POST /validate', () => {

        it('should return 200 for valid state and ticks', async () => {
            const initialState: State = {
                gameId: 'test-game-200',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 2, y: 0 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 },
            };

            const ticks = [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
            ];

            const response = await request(app)
                .post('/validate')
                .send({ ...initialState, ticks });

            expect(response.status).toBe(200);
            expect(response.body.score).toBe(1);
            expect(response.body.fruit).not.toEqual(initialState.fruit);
        });

        it('should return 400 for invalid request (missing fields)', async () => {
            const response = await request(app)
                .post('/validate')
                .send({
                    gameId: 'test-game-400',
                    width: 10,
                    score: 0,
                    fruit: { x: 5, y: 5 },
                    snake: { x: 0, y: 0, velX: 1, velY: 0 },
                    ticks: [{ velX: 1, velY: 0 }],
                });

            expect(response.status).toBe(400);
        });

        it('should return 404 if the ticks do not lead the snake to the fruit position', async () => {
            const initialState: State = {
                gameId: 'test-game-404',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 5, y: 5 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 },
            };

            const ticks = [
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
            ];

            const response = await request(app)
                .post('/validate')
                .send({ ...initialState, ticks });

            expect(response.status).toBe(404);
        });

        it('should return 405 for invalid method (GET instead of POST)', async () => {
            const response = await request(app).get('/validate');
            expect(response.status).toBe(405);
        });

        it('should return 418 if the snake goes out of bounds', async () => {
            const initialState: State = {
                gameId: 'test-game-418',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 5, y: 5 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 },
            };

            const ticks = [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
            ];

            const response = await request(app)
                .post('/validate')
                .send({ ...initialState, ticks });

            expect(response.status).toBe(418);
        });

        it('should return 500 for internal server error (simulate with faulty input)', async () => {
            const response = await request(app)
                .post('/validate')
                .send({
                    gameId: 'trigger500',  // This will trigger the internal server error
                    width: 10,
                    height: 10,
                    score: 0,
                    fruit: { x: 5, y: 5 },
                    snake: { x: 0, y: 0, velX: 1, velY: 0 },
                    ticks: [{ velX: 1, velY: 0 }]
                });

            expect(response.status).toBe(500);
        });
    });
});
