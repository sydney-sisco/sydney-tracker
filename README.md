# webapp-template

A starting point.

Includes:
- Frontend: React, Vite
- Backend: Express, Socket.io

## To Do

Install TailwindCSS. [Instructions](https://tailwindcss.com/docs/guides/vite)
Add tests to backend:
https://www.npmjs.com/package/jest
https://www.npmjs.com/package/supertest

backend debugging with vscode

## Development

Uses Node v18

Node versions [here](https://nodejs.dev/en/about/releases/)

## Frontend

React app set up with Vite. Details of that [here](https://vitejs.dev/guide/).

`cd frontend`

`npm install`

`npm run dev`

Runs on [localhost:3000](http://localhost:3000). Available on your local network. Requests to the backend are [proxied](https://vitejs.dev/config/server-options.html#server-proxy) by the dev server. 

## Backend

Express. Nodemon for development. 

`cd backend`

`npm install`

`npm run start`

Listens on [port 3001](http://localhost:3001) 

### Backend Dependencies

- express
- dotenv
- socket.io

### Dev dependencies

- nodemon