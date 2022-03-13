var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, () => {
   console.log(`Listening to requests on port 3000.`);
});

// Static files
app.use(express.static('public'));

// Socket setup - pass in server as parameter
var io = socket(server);

// Socket will wait for a connection
io.on('connection', (socket) => {
   console.log(`${socket.id} has made a connection!`);

   // Listen for client message and transmit it to all socket endpoints
   socket.on('chat', (data) => {
      io.sockets.emit('chat', data);
   })

   // Broadcast typing status message to every other socket endpoint
   socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
   })

   socket.on("move circle", (data) => {
      socket.broadcast.emit('move circle', data);
   })
});

