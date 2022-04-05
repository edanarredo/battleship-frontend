// Create Game Button
createGameBtn.addEventListener('click', () => {
   socket.emit('newGame')
   init();
});

// Join Game Button
joinGameBtn.addEventListener('click', () => {
   const code = lobbyIdInput.value
   socket.emit('joinGame', code);
   init();
});

// Emit "guess" positioning on click event
board.addEventListener('click', (event) => {
   socket.emit('guess', {
      piece_location: event.target.parentNode,
      piece_type: "guess",
      piece_direction: "north"
   });
});

// Emit new square positioning on drop event
board.addEventListener('drop', () => {
   let new_coord = getPlacedSquareCoordinate();
   updatePositionText(new_coord)

   socket.emit("movedSquare", {
      piece_position: new_coord,
      piece_type: "warship",
      piece_direction: "north"
   });
});

// Receive new square positioning from websocket if on packet receive
socket.on('movedSquare', (data) => {
   console.log(data);
   updateSquarePosition(data.piece_position.xPos, data.piece_position.yPos, data.piece_position.index, 'north');
   let new_coord = getPlacedSquareCoordinate();
   updatePositionText(new_coord)
});
