export type Snake = {
    x: number;
    y: number;
    velX: number;
    velY: number;
};

export type Fruit = {
    x: number;
    y: number;
};

export type State = {
    gameId: string;
    width: number;
    height: number;
    score: number;
    fruit: Fruit;
    snake: Snake;
};
