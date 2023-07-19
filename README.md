# Remitano Interview
## I. Run application with Docker on Local environment
# I Introduction

The project is the result of a recruitment interview conducted by Remitano company, aiming to assess candidates' technical skills, testing abilities, and more.

The project's main functionality is to provide login/registration features and allow users to share YouTube videos. It also notifies real time other logged-in members about the shared videos.

# II. Requirements

- Install Docker
- Install Docker compose

# III Installation & Configuration

Step 1: Clone the project from the github repository.

Step 2: Create and Configure the environment for the api application `src/api/.env`.

    - ACCESS_TOKEN_SECRET: secret key to generate access token when logging into the application.
    - REFRESH_TOKEN_SECRET: secret key to generate refresh token when logging into the application.
    - DATABASE_URI: configure the connection url to the mongodb database.
    - GOOGLE_APP_KEY: API key used in the project to retrieve video information.
    - CLIENT_URL: path to the client application.
    - PORT: the port on which the API application will run.

    (open the file `src/api/.env.example` to see examples)

Step 3:Create and  Configure the environment for the client application `src/frontend/.env`.

    - PORT: the port on which the client application will run
    - VITE_ENV: the environment in which the application is running
    - VITE_APP_API_URL: configuration for the API endpoint
    - VITE_SOCKET_SHARE_VIDEO_APP_URL: configuration for the socket endpoint

    (open the file `src/frontend/.env.example` to see the examples)

# IV Database Setup

(Installed along with docker)

# V Running the Application


Step 1: Run the command `docker-compose up --build -d` to build the images and start the containers.

Step 2: After the containers have been started, please wait a few minutes for the API server to begin and connect to the database.

Step 3: Access `http://localhost:3001/` to access the application.


### Access application

(Default settings, which can be changed in the docker-compose file)

- Database

```
http://localhost:3001/
```

- Api

```
http://localhost:3500
```

- client

```
http://localhost:3001/
```


### To run the test suite:

Step 1: Run the command `docker-compose up --build -d` to build the images and start the containers.

Step 2: After the containers have been started, please wait a few minutes for the API server to start and connect to the database.

Step 3: Check the containers using the command `docker ps`, and copy the `CONTAINER ID` of the container with the name `api`.

Step 4: Access the api container to run the test suite by executing the command `docker exec -it [CONTAINER ID that was copied] sh`.

Step 5: Inside the api container, execute the command `npm run test`.

Step 6: Check the result.


# VI Docker Deployment

### VI.1. Build application

```
docker-compose build
```

### VI.2. Run application

```
docker-compose up --build -d
```

### VI.3. Stop application

```
docker-compose down
```

# VII Usage

1. Login/Register

    Proceed to log in/register an account with the system. When logging in for the first time, the system will record your account information, including your email and password. For subsequent logins, you must use the correct password to access that account.

2. Share video
    
    After logging in, you will have the ability to share YouTube videos and receive real-time notifications if others share videos at that time.

# VIII Troubleshooting

### 1: Cách lấy google api key

Step 1: Access `https://console.cloud.google.com/` and log in to your account.

Step 2: Create a new project.

Step 3: On the newly created project, enable the `YouTube Data API v3` service.

Step 4: Click on the `Credentials` menu and create an API key to access the application.

Step 5: Copy the API key and paste it into the application's env file (api).


# IX. Directory structure
```
docker
    |--api
    |--client
    |--mongodb
src
    |--log
    |--frontend
        |--public
        |--src
        |--.editorconfig
        |--.env
        |--.gitignore
        |--index.html
        |--package.json
        |--package-lock.json
        |--postcss.config.cjs
        |--README.md
        |--tailwind.config.cjs
        |--tsconfig.json
        |--tsconfig.node.json
        |--vite.config.ts
        |--yarn.lock
    |--database
    |--api
        |--config
        |--controllers
        |--logs
        |--middleware
        |--model
        |--public
        |--routes
        |--services
        |--test
        |--views
        |--.editorconfig
        |--.env
        |--.gitignore
        |--app.js
        |--package.json
        |--package-lock.json
        |--README.md
        |--server.js
        |--socket.js
```