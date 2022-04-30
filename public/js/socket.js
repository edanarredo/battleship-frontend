// Create Game Button
createGameBtn.addEventListener('click', () => {
   socket.emit('createGame', "create");
});

// Join Game Button
joinGameBtn.addEventListener('click', () => {
   const code = lobbyIdInput.value;
   socket.emit('joinGame', { code: code });
});

// Start Game Button
startGameBtn.addEventListener('click', () => {
   socket.emit('startGame', { lobbyId: lobbyId });
   gameMode = 'multiplayer';
});

// Guess Event
function makeGuess(ev) {
   if (gameMode == 'multiplayer') {
      socket.emit('guess', {
         piece_location: ev.target,
         piece_type: "guess",
         piece_direction: "north"
      });
   } 
   else {
      // something
      return true;
   }
}

// Square move event
board.addEventListener('drop', () => {
   let new_coord = getLastPlacedPieceCoordinates();

   if (gameMode == 'multiplayer') {
      socket.emit("movedSquare", {
         piece_position: new_coord,
         piece_type: "warship",
         piece_direction: "north"
      });
   }
});

// Receive room status after menu interaction
socket.on('roomStatus', (data) => {
   console.log(data);
   if (data.status == true) {
      lobbyId = data.roomId;
      document.getElementById("lobbyId").innerText = `Your Game Lobby ID: ${lobbyId}`;
   }
   else
      alert('Something went wrong. Try again.');
});

// Receive that game is in a ready state and enable start button
socket.on('gameReady', (data) => {
   let spinner = document.getElementById("loader");
   document.getElementById("opponentListItem").removeChild(spinner);
   document.getElementById("lobbyId").innerText = `Your Game Lobby ID: ${data.roomId}`;
   opponentListItem.innerText = "Player 2";
   startGameBtn.disabled = false;
   startGameBtn.classList.remove("btn-danger");
   startGameBtn.classList.add("btn-primary");
});

// Receive flag to start game.
socket.on('startGame', (data) => {
   console.log('here!');
});
