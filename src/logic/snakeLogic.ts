import { Fruit, Snake, State } from "../types";

export const getInitialState = (width: number, height: number): State => {
    return {
        gameId: `game-${Date.now()}`,
        width,
        height,
        score: 0,
        fruit: {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
        },
        snake: {
            x: 0,
            y: 0,
            velX: 1,
            velY: 0,
        },
    };
};

export const validateTicks = (state: State, ticks: { velX: number; velY: number }[]): State | false => {
    let { snake } = state;

    ticks.forEach((tick) => {
        if (
            (snake.velX === 1 && tick.velX === -1) ||
            (snake.velX === -1 && tick.velX === 1) ||
            (snake.velY === 1 && tick.velY === -1) ||
            (snake.velY === -1 && tick.velY === 1)
        ) {
            return false;
        }

        snake.x += tick.velX;
        snake.y += tick.velY;
        snake.velX = tick.velX;
        snake.velY = tick.velY;
    });

    if (snake.x < 0 || snake.x >= state.width || snake.y < 0 || snake.y >= state.height) {
        return false;
    }

    return { ...state, snake };
};

export const checkFruitReached = (snake: Snake, fruit: Fruit): boolean => {
    return snake.x === fruit.x && snake.y === fruit.y;
};

export const updateStateAfterFruitReached = (state: State): State => {
    return {
        ...state,
        score: state.score + 1,
        fruit: {
            x: Math.floor(Math.random() * state.width),
            y: Math.floor(Math.random() * state.height),
        },
    };
};