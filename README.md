# Node.js Application with MongoDB Dockerization

This repository contains a Node.js application that manages users and tasks, utilizing MongoDB for data storage. The application is containerized using Docker, and Docker Compose coordinates the containers for both the application.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/your-node-app.git
    cd your-node-app
    ```

2. Create a `.env` file in the root directory with the following environment variables:

    ```env
    MONGODB_URI=mongodb://mongo:27017/your-database-name
    PORT=8080
    ```

3. Build and start the containers:

    ```bash
    docker-compose up --build
    ```

4. Access the application at http://localhost:8080.

## API Endpoints

- **Users:**
    - `GET /users`: Get all users
    - `GET /users/:id`: Get a user by ID
    - `POST /users`: Create a new user

- **Tasks:**
    - `GET /tasks`: Get all tasks
    - `GET /tasks/:id`: Get a task by ID
    - `POST /tasks`: Create a new task
    - `PUT /tasks/:id`: Update a task by ID
    - `DELETE /tasks/:id`: Delete a task by ID

## Running Tests

1. Access the running application container:

    ```bash
    docker-compose exec app sh
    ```

2. Inside the container, run the tests:

    ```bash
    npm test
    ```

## Stopping the Containers

To stop the containers, use:

```bash
docker-compose down


## License
[MIT] ()
The project is licensed under the MIT license.

Copyright (c) [2023] [EmmanuelOnugha]
