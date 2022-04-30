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
   });

   // Sender joins lobby
   socket.on('joinGame', (data) => {
      let lobbyId = data.code
      if (clientRooms[lobbyId]) {
         clientRooms[lobbyId].push(`${socket.id}`);
         socket.join(lobbyId);
         socket.to(lobbyId).emit('gameReady', {status: true, roomId: lobbyId});
      }
      else 
         socket.broadcast.to(socket.id).emit('roomStatus', {status: false, roomId: null});
   });

   // Emit square position
   socket.on('movedSquare', (data) => {
      socket.broadcast.emit("movedSquare", data);
   });

   // Emit guess position
   socket.on('guess', (data) => {
      socket.broadcast.emit("guess", data);
   });

   // Emit game start for all clients in room.
   socket.on('startGame', (data) => {
      io.in(data.lobbyId).emit('startGame', {roomId: data.lobbyId});
   });
});

// Server start
app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});