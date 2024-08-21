import express from 'express';
import { getInitialState } from './logic/snakeLogic';
const app = express();
app.use(express.json());

app.get('/new', (req, res) => {
    const width = parseInt(req.query.w as string);
    const height = parseInt(req.query.h as string);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        return res.status(400).send('Invalid request');
    }

    const state = getInitialState(width, height);
    res.status(200).json(state);
});

export default app;