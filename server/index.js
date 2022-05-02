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
      clientRooms[roomId] = {};
      clientRooms[roomId][socket.id] = {
         points: 0
      };
      socket.emit('roomStatus', { status: true, roomId: roomId });
   });

   // Sender joins lobby
   socket.on('joinGame', (data) => {
      let lobbyId = data.code
      if (clientRooms[lobbyId]) {
         clientRooms[lobbyId][socket.id] = {
            points: 0
         };
         socket.join(lobbyId);
         socket.to(lobbyId).emit('gameReady', { status: true, roomId: lobbyId });
      }
      else
         socket.broadcast.to(socket.id).emit('roomStatus', { status: false, roomId: null });
   });

   // Emit square position
   socket.on('guessSpace', (data) => {
      socket.broadcast.emit("movedSquare", data);
   });

   // Emit guess position
   socket.on('guess', (data) => {
      socket.broadcast.emit("guess", data);
   });

   // Emit game start for all clients in room.
   socket.on('startGame', (data) => {
      io.in(data.lobbyId).emit('startGame', { roomId: data.lobbyId });
      console.log(clientRooms);
   });

   // Emit game start for all clients in room.
   socket.on('startBombing', (data) => {
      io.in(data.lobbyId).emit('startBombing', { roomId: data.lobbyId });
      console.log(clientRooms);
   });

   socket.on('postBoard', (data) => {
      console.log(data);
      clientRooms[data.lobbyId][socket.id]['board'] = data.board;
      socket.broadcast.emit('receiveBoard', { fromUser: socket.id, opponentBoard: clientRooms[data.lobbyId][socket.id]['board'] })
   });
});

// Server start
app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});