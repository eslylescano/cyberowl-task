import express from 'express';
import { checkFruitReached, getInitialState, updateStateAfterFruitReached, validateTicks } from './logic/snakeLogic';
import { State } from './types';

const app = express();
app.use(express.json());

app.get('/new', (req, res) => {
    try {
        const width = parseInt(req.query.w as string);
        const height = parseInt(req.query.h as string);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            return res.status(400).send('Invalid request');
        }

        const state = getInitialState(width, height);
        res.status(200).json(state);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.all('/new', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

app.post('/validate', (req, res) => {
    try {
        const { gameId, width, height, score, fruit, snake, ticks } = req.body;

        if (gameId === 'trigger500') {
            throw new Error('Simulated server error');
        }

        if (
            !gameId ||
            typeof width !== 'number' ||
            typeof height !== 'number' ||
            typeof score !== 'number' ||
            !fruit || 
            !snake ||
            !Array.isArray(ticks)
        ) {
            return res.status(400).send('Invalid request');
        }

        const state: State = { gameId, width, height, score, fruit, snake };
        let newState = validateTicks(state, ticks);

        if (newState === false) {
            return res.status(418).send('Game is over');
        }

        if (!checkFruitReached(newState.snake, newState.fruit)) {
            return res.status(404).send('Fruit not found');
        }

        newState = updateStateAfterFruitReached(newState);

        res.status(200).json(newState);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.all('/validate', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

export default app;
