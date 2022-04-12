// Create Game Button
createGameBtn.addEventListener('click', (event) => {
   socket.emit('createGame', "create");
});

// Join Game Button
joinGameBtn.addEventListener('click', (event) => {
   const code = lobbyIdInput.value
   console.log(code);
   socket.emit('joinGame', code);
});

// Guess Event
board.addEventListener('click', (event) => {
   socket.emit('guess', {
      piece_location: event.target.parentNode,
      piece_type: "guess",
      piece_direction: "north"
   });
});

// Square move event
board.addEventListener('drop', () => {
   let new_coord = getPlacedSquareCoordinate();
   updatePositionText(new_coord)

   socket.emit("movedSquare", {
      piece_position: new_coord,
      piece_type: "warship",
      piece_direction: "north"
   });
});

// Receive moved square broadcast
socket.on('movedSquare', (data) => {
   console.log(data);
   updateSquarePosition(data.piece_position.xPos, data.piece_position.yPos, data.piece_position.index, 'north');
   let new_coord = getPlacedSquareCoordinate();
   updatePositionText(new_coord)
});

// Receive room status after menu interaction
socket.on('roomStatus', (data) => {
   console.log(data);
   if (data.status == true) 
      document.getElementById("lobbyId").innerText = `Game Code: ${data.roomId}`;
      
   else
      alert('Something went wrong. Try again.');
})
