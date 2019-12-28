// Define all the routes in this file and tell our app which functions to call when someone accesses that route

import express from 'express';
import * as recipes from '../controllers/recipes'; // Get our handler functions

const router = express.Router(); // Initialize the server router

router.get( '/test', recipes.test ); // Define the route

// Second example, the :id is a route parameter that gets  
// passed into the function through req.id
router.get( '/test/:id', recipes.asyncTest );

export { router }; // export the router we initialized so it can be used