# SydneyTracker

An app to find Sydney. Live at [tracker.sydneysisco.com](https://tracker.sydneysisco.com).

Includes:
- Frontend: React, Vite
- Backend: Express, Socket.io


## Development

Uses Node v18

Node versions [here](https://nodejs.dev/en/about/releases/)

### Deployment

To deploy the app you can follow these steps:

from the frontend directory:

`npm run build`

This will create a production build of the frontend in the `backend/public` directory.

from the backend directory:

`gcloud run deploy`

It's really that easy.


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

