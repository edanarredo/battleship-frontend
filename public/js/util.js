// Return array of length 100 indicating open and occupied spaces
function getDOMBoard(board = "SELF") {
   var result = Array.from(Array(100).keys());

   let gameBoard = board == "SELF" ? boxes : opponentBoard;

   // Indexes of board with a square in it are marked 1, else 0
   gameBoard.forEach((item, index) => {
      if (item.childElementCount > 0) {
         if (item.children[0].classList.contains("battleship"))
            result[index] = 1;
         else if (item.children[0].classList.contains("carrier"))
            result[index] = 2;
         else if (item.children[0].classList.contains("destroyer"))
            result[index] = 3;
         else if (item.children[0].classList.contains("patrol"))
            result[index] = 4;
         else if (item.children[0].classList.contains("submarine"))
            result[index] = 5;
      }
      else {
         result[index] = 0;
      }
   });

   return result;
}

function getPieceImage(index, piece_type, piece_direction) {
   let tile_img_path = "";
   let directory = (piece_direction == "south" ? `"../assets/Vertical/` : `"../assets/Horizontal/`);

   switch (piece_type) {
      case 1:
         tile_img_path = `${directory}4/4_${index}.png"`;
         break;
      case 2:
         tile_img_path = `${directory}5/5_${index}.png"`;
         break;
      case 3:
         tile_img_path = `${directory}3A/3A_${index}.png"`;
         break;
      case 4:
         tile_img_path = `${directory}2/2_${index}.png"`;
         break;
      case 5:
         tile_img_path = `${directory}3B/3B_${index}.png"`;
         break;
      default:
         break;
   }
   return tile_img_path;
}

function copyToClipboard() {
   navigator.clipboard.writeText(lobbyId);
   alert(`'${lobbyId}' copied to clipboard!`);
}

// Init player board with event listeners
for (const box of boxes) {
   box.addEventListener("dragenter", dragEnter);
   box.addEventListener("dragleave", dragLeave);
}

for (let i = 0; i < 100; i++) {
   opponentBoxes[i].setAttribute('data-index', `${i}`);
}

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
      opponentBoxes[guessIndex].innerHTML = `<div style="border: 4px solid RED !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
      usersTurn = true;
   }
   else if (opponentBoard[guessIndex].innerText < 0) {
      usersTurn = true;
   }
   else {
      opponentBoxes[guessIndex].innerHTML = `<div style="border: 4px solid YELLOW !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
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
      opponentBoxes[data.correctGuessIndex].innerHTML = `<div style="border: 4px solid RED !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
      adjustBoatHealth(data.boatType, "opponent");
      usersTurn = true;
   }
   // Opponent hits. Still opponent's turn.
   else {
      boxes[data.correctGuessIndex].innerHTML = `<div style="border: 4px solid RED !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
      adjustBoatHealth(data.boatType, "user");
      usersTurn = false;
   }
   checkWinner();

});

socket.on('opponentGuessedWrong', (data) => {
   // User misses shot. Pass turn
   if (usersTurn) {
      opponentBoxes[data.wrongGuessIndex].innerHTML = `<div style="border: 4px solid YELLOW !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
      usersTurn = false;
      gameStatus.innerText = "Opponent's turn.";
   }

   // Opponent misses shot. Give turn.
   else {
      boxes[data.wrongGuessIndex].innerHTML = `<div style="border: 4px solid YELLOW !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
      usersTurn = true;
      gameStatus.innerText = "Your turn!";
   }
});

async function checkWinner() {
   let userFleetSize = Object.values(all_ship_statuses.user);
   let opponentFleetSize = Object.values(all_ship_statuses.opponent);

   var userIsDead = userFleetSize.reduce((a, b) => a + b) == 0;
   var opponentIsDead = opponentFleetSize.reduce((a, b) => a + b) == 0;

   var result;

   if (userIsDead || opponentPoints == 17)
      result = { winner: "Opponent", gameOver: true };
   else if (opponentIsDead || userPoints == 17)
      result = { winner: "User", gameOver: true };
   else {
      result = { winner: "None", gameOver: false };
      return result;
   }

   gameStatus.innerText = `${result.winner == "Opponent" ? "Your Opponent" : "You"} won!`;

   if (result.winner == "Opponent") {
      table.classList.remove('bg-light');
      table.classList.add('lose');
      newBottomHUD.classList.remove('bg-light');
      newBottomHUD.classList.add('lose');
   } else {
      table.classList.remove('bg-light');
      table.classList.add('win');
      newBottomHUD.classList.remove('bg-light');
      newBottomHUD.classList.add('win');
   }

   // Wait 5 seconds and open game over modal
   await new Promise(r => setTimeout(r, 3000));
   openRestartModal();
   return result;
}

function openRestartModal() {
   var resetGameModal = document.getElementById('exampleModalRestart')
   var modal = bootstrap.Modal.getOrCreateInstance(resetGameModal);
   modal.toggle();
}