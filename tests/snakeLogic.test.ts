import { getInitialState, validateTicks } from "../src/logic/snakeLogic";
import { State } from "../src/types";

describe('Snake Logic', () => {
    describe('getInitialState', () => {
        it('should return the correct initial state', () => {
            const width = 10;
            const height = 10;
            const state: State = getInitialState(width, height);

            expect(state.snake).toEqual({ x: 0, y: 0, velX: 1, velY: 0 });
            expect(state.width).toBe(width);
            expect(state.height).toBe(height);
            expect(state.score).toBe(0);
            expect(state.fruit.x).toBeGreaterThanOrEqual(0);
            expect(state.fruit.x).toBeLessThan(width);
            expect(state.fruit.y).toBeGreaterThanOrEqual(0);
            expect(state.fruit.y).toBeLessThan(height);
        });
    });


    describe('validateTicks', () => {
        let state: State;
    
            state = {
                gameId: 'test-game',
                width: 10,
                height: 10,
                score: 0,
                fruit: { x: 5, y: 5 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 },
            };
    
    
        it('should move the snake forward correctly', () => {
            const ticks = [{ velX: 1, velY: 0 }];
            const result = validateTicks(state, ticks);
    
            expect(result).toBeTruthy();
            if (result) {
                expect(result.snake).toEqual({ x: 1, y: 0, velX: 1, velY: 0 });
            }
        });
    
        it('should return false if the snake goes out of bounds', () => {
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
    
            const result = validateTicks(state, ticks);
            expect(result).toBe(false);
        });
    
        it('should return false for invalid movement (180-degree turn)', () => {
            const ticks = [
                { velX: 1, velY: 0 },
                { velX: -1, velY: 0 }
            ];
    
            const result = validateTicks(state, ticks);
            expect(result).toBe(false);
        });
    
    });
    
    describe('checkFruitReached', () => {
        it('should return true if the snake reaches the fruit', () => {
            const snake = { x: 5, y: 5, velX: 1, velY: 0 };
            const fruit = { x: 5, y: 5 };
    
            expect(checkFruitReached(snake, fruit)).toBe(true);
        });
    
        it('should return false if the snake does not reach the fruit', () => {
            const snake = { x: 4, y: 5, velX: 1, velY: 0 };
            const fruit = { x: 5, y: 5 };
    
            expect(checkFruitReached(snake, fruit)).toBe(false);
        });
    });

});



