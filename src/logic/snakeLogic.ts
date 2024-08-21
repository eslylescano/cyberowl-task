import { State } from "../types";

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