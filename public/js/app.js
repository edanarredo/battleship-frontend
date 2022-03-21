// Make connection
var socket = io();

// Get board from DOM
var board = document.getElementById('board');

// Emit "guess" positioning on click event
board .addEventListener('click', (event) => {
   socket.emit('guess', {
      piece_location: event.target.parentNode,
      piece_type: "guess",
      piece_direction: "north"
   });
});

// Emit new square positioning on drop event
board.addEventListener('drop', () => {
   socket.emit("movedSquare", {
      piece_position: getPlacedSquareCoordinate(),
      piece_type: "warship",
      piece_direction: "north"
   });
});

// Receive new square positioning from websocket if on packet receive
socket.on('movedSquare', (data) => {
   console.log(data);
   updateSquarePosition(data.piece_position.xPos, data.piece_position.yPos, data.piece_position.index);
   getPlacedSquareCoordinate();
});