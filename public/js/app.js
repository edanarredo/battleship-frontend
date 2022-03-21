// Make connection
var socket = io();

//Query DOM
var board = document.getElementById('board');

// Emit events
board.addEventListener('click', () => {
   if (message.value.length > 0) {
      socket.emit('chat', {
         message: message.value,
         handle: handle.value
      });
      message.value = ``;
   }
});

board.addEventListener('drop', () => {
   socket.emit("movedSquare", {
      piece_position: getPlacedPieceCoordinate(),
      piece_type: "warship",
      piece_direction: "north"
   });
});

socket.on('movedSquare', (data) => {
   console.log(data);
   // update position of square
   updateSquarePosition(data.piece_position.xPos, data.piece_position.yPos, data.piece_position.index);
   getPlacedPieceCoordinate();
});