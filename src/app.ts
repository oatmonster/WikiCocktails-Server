import express from 'express';
import cors from 'cors';

import * as routes from './api/routes'; // Get our route handlers

const app = express(); // initialize the express server

app.use( cors() ); // Tell our server to use the cors middleware (don't worry about this)

// We can define routes here but to keep things organized, we define them in ./routes/index.ts
app.get( '/', ( req, res ) => res.send( 'Copyright Alex Zhao 2019' ) );

// Tell our server to send all routes starting with /api to the routes defined by routes.router
// eg localhost:3000/api/test gets handled by the /test route defined in routes.router
app.use( '/api', routes.router );

export { app }