// Functions that handle requests go in this folder
// This file is for functions that have to do with recipes (this can be reorganized)

import request from 'request-promise-native';

// Define a function
function test( req, res ) {
  // Send the response, can't send anything after this 
  // so calling res.send twice will cause an error. For sending
  // JSON formatted data, use res.json()
  res.send( 'test' );

  // You can do stuff like set the response status before sending the data (like 404, 502, 200)
  // so for example, if there was an error on your end you might want to send a response with status
  // 500 that contains some relevant information (you can look up what the status codes mean)
  // You could do that by doing:
  // res.status(500); 
  // res.send('Something bad happened on the server');
  // Or you could just use
  // res.sendStatus(500);
  // which sends a response with status 500 and a body that is
  // just the string associated with the status code (in this case 'Internal Server Error')
}

// This function does some async stuff using promises and
// Takes a parameter (id)
function asyncTest( req, res ) {

  // We can do some validation first
  if ( isNaN( req.params.id ) ) {
    res.sendStatus( 400 ); // Bad request
    return;
  }

  // We're going to get data from this api, you can try just going to this url
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=';
  url += req.params.id;

  // The request-promise-native library lets us make http requests
  // It returns a native javascript promise that resolves to the value of the response
  // or rejects in the case of an error
  request( url ).then( response => {
    // .then can be called on a promise to do something once it resolves
    // It takes a function as a parameter and calls that function when the promise resolves
    // In this case I'm using an arrow function

    // response is now the response we got from our request to url
    // For some reason this api sends it as a string
    response = JSON.parse( response );
    if ( response.ingredients === null ) { // For this api, an invalid id sends the response {"ingredients": null}
      throw new Error( 'Invalid ingredient id' );
    } else {
      res.status( 200 ).json( response.ingredients[ 0 ].strIngredient );
    }

    // If your function in .then returns another promise, you can keep chaining .then calls
    // i.e.
    // request(url).then(functionThatReturnsAPromise).then(anotherFunction).then()...
  } ).catch( error => {
    // If there's a promise rejection anywhere in the chain, control immediately jumps to the next .catch in the chain
    // Errors thrown in prior .then will also be caught by this .catch
    // Don't use a normal try catch block with promises because when the promise is created, there might not be any
    // errors but there might be some errors that happen when the promise resolves and
    // a normal catch block won't catch those
    res.sendStatus( 500 ); // Send an error status, normally we would want to check what status to send
  } ).finally( () => {
    // Just like a try catch block, you can also have finally
    // It will execute no matter what and takes a function as a parameter as well, just like .then and .catch
    // However, the function doesn't take any parameters because you can't know if the promise was resolved or rejected
    console.log( 'Got a request for /api/test/' + req.params.id );
  } );
}

// Make that function availible to anyone who imports this module (file)
// In this case, routes/index.ts
export { test, asyncTest };