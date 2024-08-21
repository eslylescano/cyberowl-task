import { getInitialState } from "../src/logic/snakeLogic";
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
});