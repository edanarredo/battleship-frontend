const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const lobby = require('./lib/utility');

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
   
   socket.emit('join', {id: socket.id});

   // Sender disconnects
   socket.on('disconnect', () => {
      console.log("A user disconnected.\nuserId: " + socket.id);
   });

   // Sender creates lobby
   socket.on('createGame', (data) => {
      let roomId = lobby.generateId();
      socket.join(roomId)
      clientRooms[roomId] = {};
      clientRooms[roomId][socket.id] = {};
      socket.emit('roomStatus', { status: true, roomId: roomId, host: socket.id });
   });

   // Sender joins lobby
   socket.on('joinGame', (data) => {
      let lobbyId = data.code
      let players = Object.keys(clientRooms[lobbyId]);
      if (clientRooms[lobbyId]) {
         clientRooms[lobbyId][socket.id] = {};
         socket.join(lobbyId);
         socket.to(lobbyId).emit('gameReady', { status: true, roomId: lobbyId, host: players[0], guest: socket.id});
      }
      else
         socket.broadcast.to(socket.id).emit('roomStatus', { status: false, roomId: null });
   });

   // Emit guess position
   socket.on('guess', (data) => {
      var guessIndex = data.guessIndex;
      var roomId = data.roomId;
      var user = Object.keys(clientRooms[roomId]).filter(item => item != data.userId);
      var board = clientRooms[roomId][user]['board'];
      console.log(board);

      if (board[guessIndex] > 0) {
         io.in(roomId).emit('opponentGuessedRight', {correctGuessIndex: guessIndex, boatType: board[guessIndex]});
         board[guessIndex] = -1;
      }
      else if (board[guessIndex] == 0) 
         io.in(roomId).emit('opponentGuessedWrong', {wrongGuessIndex: guessIndex, boatType: board[guessIndex]});
   });

   // Emit game start for all clients in room.
   socket.on('startGame', (data) => {
      io.in(data.lobbyId).emit('startGame', { roomId: data.lobbyId });
   });

   // Emit game start for all clients in room.
   socket.on('startBombing', (data) => {
      io.in(data.lobbyId).emit('startBombing', { roomId: data.lobbyId });
   });

   // Save board from user emit
   socket.on('postBoard', (data) => {
      clientRooms[data.roomId][socket.id]['board'] = data.board;
      socket.broadcast.emit('boardCompleteAlert', { fromUser: socket.id })
   });
});

// Server start
app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});