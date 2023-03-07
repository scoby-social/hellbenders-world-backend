# Hellbenders API

This is the main API application for Hellbenders World 

## Prerequisites

- `Docker` and `Docker Compose` [Download](https://docs.docker.com/engine/install/)

## Environment setup

`.env.example` file consists environment variables that needed to be set up.
You can create `.env` file or set up environment variables in system.

## Running the app

Project has been built using docker compose, running the command below will run your application with 2 containers:

- `MongoDB` container listening on port 27017
- `API` container listening on port 8080

To run it, execute the command 

```bash
$ docker-compose up -d
```

## Project Structure

All the project files are inside `src/` folder

Configuration folders would be

`config/` contains MongoDB configuration
`firebase/` initializes Firebase and has a function to delete a file

All the modules shares the same structure, having 

- `controller.ts` where all the http routes are
- `validators.ts` custom validators using express-validator
- `types/` a folder that contains all the type definitions for the module
- `services/` contains the logic that must be executed before comunicating with DB, just after http endpoint call
- `repositories/` contains the comunication with DB

And also the blockchain comunication

- `shdw_drive/` contains comunication with Shadow Drive Storage
- `web3/` contains logic to comunicate with blockchain

## License

Copyright 2022 Scoby Society

Licensed under the GNU License, Version 3.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

https://www.gnu.org/licenses/agpl-3.0.en.html

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

