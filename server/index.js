const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Server is up on port ${port}.`);
});

// Open socket.io connection
io.on('connection', (socket) => {
   console.log("A user connected.");

   socket.on('disconnect', () => {
      console.log("A user disconnected.");
   });

   socket.on('movedSquare', (data) => {
      io.emit("movedSquare", data);
   });
});

