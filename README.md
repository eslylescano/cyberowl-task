Here's a sample `README.md` for your project based on the repository link provided. This README file includes sections for project overview, setup instructions, API documentation, and testing information. 

```markdown
# Cyberowl Task

Welcome to the Cyberowl Task repository! This project implements a Snake game API with functionality for initializing game state, validating game ticks, and handling fruit collection. 

## Project Overview

The Snake game API provides endpoints to:
- Initialize a new game with a specified board size.
- Validate the movements of the snake and update the game state accordingly.
- Handle fruit collection and score updating.

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)

## Setup Instructions

To set up and run this project locally, follow these steps:

### Prerequisites

- Node.js (>= 16.0.0)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/eslylescano/cyberowl-task.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd cyberowl-task
   ```

3. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

4. **Run the application:**

   Using npm:
   ```bash
   npm start
   ```

   Or using yarn:
   ```bash
   yarn start
   ```

   The application will start on `http://localhost:3000` by default.

## API Documentation

### Initialize New Game

**Endpoint:** `GET /new`

**Query Parameters:**
- `w` (number): Width of the game board.
- `h` (number): Height of the game board.

**Response:**
- `200 OK` with the initial game state.

**Example Request:**

```http
GET /new?w=10&h=10
```

**Example Response:**

```json
{
  "gameId": "game-1627483803480",
  "width": 10,
  "height": 10,
  "score": 0,
  "fruit": { "x": 3, "y": 7 },
  "snake": { "x": 0, "y": 0, "velX": 1, "velY": 0 }
}
```

### Validate Snake Movements

**Endpoint:** `POST /validate`

**Request Body:**
```json
{
  "gameId": "string",
  "width": "number",
  "height": "number",
  "score": "number",
  "fruit": { "x": "number", "y": "number" },
  "snake": { "x": "number", "y": "number", "velX": "number", "velY": "number" },
  "ticks": [ { "velX": "number", "velY": "number" } ]
}
```

**Response:**
- `200 OK` with the updated game state if the fruit is reached.
- `418 I'm a teapot` if the game is over (the snake has hit a wall).
- `404 Not Found` if the fruit was not reached.
- `500 Internal Server Error` for general server errors.

**Example Request:**

```http
POST /validate
Content-Type: application/json

{
  "gameId": "test-game",
  "width": 10,
  "height": 10,
  "score": 0,
  "fruit": { "x": 5, "y": 5 },
  "snake": { "x": 0, "y": 0, "velX": 1, "velY": 0 },
  "ticks": [ { "velX": 1, "velY": 0 }, { "velX": 1, "velY": 0 } ]
}
```

**Example Response:**

```json
{
  "gameId": "test-game",
  "width": 10,
  "height": 10,
  "score": 1,
  "fruit": { "x": 7, "y": 3 },
  "snake": { "x": 2, "y": 0, "velX": 1, "velY": 0 }
}
```

## Testing

To run the tests, use the following command:

Using npm:
```bash
npm test
```

Or using yarn:
```bash
yarn test
```

This will execute the test suite and verify that the functionality of the Snake game API works as expected.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Explanation:
- **Project Overview**: Brief description of the project and its functionality.
- **Setup Instructions**: Detailed steps to set up the project on a local machine.
- **API Documentation**: Details about the API endpoints, including request and response examples.
- **Testing**: Instructions on how to run tests for the project.
- **License**: Specifies the license type for the project.

Feel free to customize this README further based on specific details or additional features of your project.