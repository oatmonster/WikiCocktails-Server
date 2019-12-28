// Define all the routes in this file and tell our app which functions to call when someone accesses that route

import express from 'express';
import * as recipes from '../controllers/recipes'; // Get our handler functions

const router = express.Router(); // Initialize the server router

router.get( '/test', recipes.test ); // Define the route

export { router }; // export the router we initialized so it can be used