const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// This will change when running on non-local-server/heroku/etc.
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Client rooms and states
const state = {};
const clientRooms = {};

// Server start
app.use(express.static(publicPath));
server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});

// Open socket.io connection
io.on('connection', (socket) => {
   console.log("A user connected.");

   // Log message when user disconnects
   socket.on('disconnect', () => {
      console.log("A user disconnected.");
   });

   socket.on('newGame', () => {
      let roomName = generateId(5);
      clientRooms[socket.id] = roomName;
      // socket.emit('gameCode', () => {});
   });

   socket.on('newGame', () => {

   });

   // Emit new square position on "movedSquare" event to clients
   socket.on('movedSquare', (data) => {
      console.log(data);
      socket.broadcast.emit("movedSquare", data);
      currentPos = data;
   });

   // Emit new guess position on "guess" event to clients
   socket.on('guess', (data) => {
      socket.broadcast.emit("guess", data);
      console.log(data);
   })
});

