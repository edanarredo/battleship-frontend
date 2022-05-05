function makeGuess(ev) {
   var guessIndex = ev.target.dataset.index;
   var checkForWinner = checkWinner();

   if (checkForWinner.gameOver)
      return;
   else if (usersTurn && !checkForWinner.gameOver) {
      if (gameMode == "multiplayer") 
         makeMultiplayerGuess(guessIndex);
      else {
         makeSinglePlayerGuess(guessIndex);
      }
   }
   else
      alert("Please wait for your opponent to finish...");
}

function makeSinglePlayerGuess(guessIndex) {
   var guessTileValue = opponentBoard[guessIndex];

   if (guessTileValue > 0) {
      adjustBoatHealth(Object.values(boats)[guessTileValue - 1], "opponent");
      opponentBoxes[guessIndex].innerHTML = `<div style="border: 4px solid #ff3d3d !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
      usersTurn = true;
   }
   else if (opponentBoard[guessIndex].innerText < 0) {
      usersTurn = true;
   }
   else {
      opponentBoxes[guessIndex].innerHTML = `<div style="border: 4px solid #ffdc74 !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
      usersTurn = false;
      botGuess();
   }
   checkWinner();
}

function makeMultiplayerGuess(guessIndex) {
   socket.emit('guess', {
      guessIndex: guessIndex,
      roomId: lobbyId,
      userId: userId,
      boatHealth: all_ship_statuses
   });
}

socket.on('opponentGuessedRight', (data) => {
   // User hits. Still user's turn.
   if (usersTurn) {
      opponentBoxes[data.correctGuessIndex].innerHTML = `<div style="border: 4px solid #ff3d3d !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
      adjustBoatHealth(data.boatType, "opponent");
      usersTurn = true;
   }
   // Opponent hits. Still opponent's turn.
   else {
      boxes[data.correctGuessIndex].innerHTML = `<div style="border: 4px solid #ff3d3d !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
      adjustBoatHealth(data.boatType, "user");
      usersTurn = false;
   }
   checkWinner();

});

socket.on('opponentGuessedWrong', (data) => {
   // User misses shot. Pass turn
   if (usersTurn) {
      opponentBoxes[data.wrongGuessIndex].innerHTML = `<div style="border: 4px solid #ffdc74 !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
      usersTurn = false;
      gameStatus.innerText = "Opponent's turn.";
   }

   // Opponent misses shot. Give turn.
   else {
      boxes[data.wrongGuessIndex].innerHTML = `<div style="border: 4px solid #ffdc74 !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
      usersTurn = true;
      gameStatus.innerText = "Your turn!";
   }
});
