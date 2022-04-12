const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const lobby = require('./lib/utility')

// This will change when running on non-local-server/heroku/etc.
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socket(server);

// Client rooms and states
const clientRooms = {};

// Open socket.io connection
io.on('connection', (socket) => {
   console.log("A user connected.\nuserId: " + socket.id);

   // Sender disconnects
   socket.on('disconnect', () => {
      console.log("A user disconnected.\nuserId: " + socket.id);
   });

   // Sender creates lobby
   socket.on('createGame', (data) => {
      let roomId = lobby.generateId();
      socket.join(roomId)
      clientRooms[roomId] = [];
      clientRooms[roomId].push(socket.id);
      socket.emit('roomStatus', {status: true, roomId: roomId});
      console.log(clientRooms);
   });

   // Sender joins lobby
   socket.on('joinGame', (data) => {
      let lobbyId = data.code
      if (clientRooms[lobbyId]) {
         clientRooms[lobbyId].push(`${socket.id}`);
         socket.to(lobbyId).emit('gameReady', {status: true, roomId: lobbyId})
         console.log(clientRooms);
      }
      else 
         socket.broadcast.to(socket.id).emit('roomStatus', {status: false, roomId: null});
   });

   // Emit square position
   socket.on('movedSquare', (data) => {
      console.log(data);
      socket.broadcast.emit("movedSquare", data);
   });

   // Emit guess position
   socket.on('guess', (data) => {
      socket.broadcast.emit("guess", data);
      console.log(data);
   })
});

// Server start
app.use(express.static(publicPath));
server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});