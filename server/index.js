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
      clientRooms[roomId][socket.id] = {
         points: 0
      };
      socket.emit('roomStatus', { status: true, roomId: roomId, host: socket.id });
   });

   // Sender joins lobby
   socket.on('joinGame', (data) => {
      let lobbyId = data.code
      let players = Object.keys(clientRooms[lobbyId]);
      if (clientRooms[lobbyId]) {
         clientRooms[lobbyId][socket.id] = {
            points: 0
         };
         socket.join(lobbyId);
         socket.to(lobbyId).emit('gameReady', { status: true, roomId: lobbyId, host: players[0], guest: socket.id});
      }
      else
         socket.broadcast.to(socket.id).emit('roomStatus', { status: false, roomId: null });
   });

   // Emit guess position
   socket.on('guess', (data) => {
      var shipStatuses = data.allShipStatuses;
      var guessIndex = data.guessIndex;
      var roomId = data.roomId;
      var user = Object.keys(clientRooms[roomId]).filter(item => item != data.userId);
      var board = clientRooms[roomId][user]['board'];
      
      // check if guessed space in board is correct
      if (board[guessIndex] > 0) {
         board[guessIndex] = -1;
         clientRooms[roomId][user].points++;
         io.in(roomId).emit('opponentGuessedRight', {correctGuessIndex: guessIndex});
      }
      else if (board[guessIndex] == 0) {
         io.in(roomId).emit('opponentGuessedWrong', {wrongGuessIndex: guessIndex});
      }
      console.log(`${socket.id} guessed the same spot twice.`);

      console.log(JSON.stringify(clientRooms));
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
      socket.broadcast.emit('receiveBoard', { fromUser: socket.id })
   });

   socket.on('winner', (data) => {
      var user = Object.keys(clientRooms[data.roomId]).filter(item => item != data.userId);
      io.in(data.roomId).emit('winner', 'Game ended. Looks like your opponent won!');
   });
});

// Server start
app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});