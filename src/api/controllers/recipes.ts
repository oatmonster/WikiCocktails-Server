// Functions that handle requests go in this folder
// This file is for functions that have to do with recipes (this can be reorganized)

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

// Make that function availible to anyone who imports this module (file)
// In this case, routes/index.ts
export { test };