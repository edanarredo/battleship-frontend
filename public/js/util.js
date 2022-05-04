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


   if (usersTurn && (userPoints != 17 || opponentPoints != 17)) {
      if (gameMode == "multiplayer")
         makeMultiplayerGuess(guessIndex);
      else
         makeSinglePlayerGuess(guessIndex);
     
   } else if (userPoints == 17 || opponentPoints == 17) {
      gameStatus.innerText = (userPoints == 17 ? "You win!" : "Your opponent won.");
   }
   else {
      alert("Please wait for your opponent to finish...");
   }
}

function makeSinglePlayerGuess(guessIndex) {
   var guessTileValue = opponentBoard[guessIndex];

   // if a hit
   if (guessTileValue > 0) {
      all_ship_statuses['opponent'][Object.keys(boats)[guessTileValue - 1]]--;
      userPoints++;
      opponentBoxes[guessIndex].innerHTML = `<div style="border: 4px solid RED !important; height: 100%; width: 100%;">HIT</div>`;
      usersTurn = true;
   }
   else if (opponentBoard[guessIndex].innerText < 0) {
      usersTurn = true;
   }
   else {
      opponentBoxes[guessIndex].innerHTML = `<div style="border: 4px solid YELLOW !important; height: 100%; width: 100%;">MISS</div>`;
      usersTurn = false;
      botGuess();
   }
}

function makeMultiplayerGuess(guessIndex) {
   socket.emit('guess', {
      guessIndex: guessIndex,
      roomId: lobbyId,
      userId: userId
   });
}

socket.on('opponentGuessedRight', (data) => {
   console.log(data);
   // if users got it right, mark opponent board.
   if (usersTurn) {
      opponentBoxes[data.correctGuessIndex].innerText = "-1";
      userPoints++;
      usersTurn = true;
   }
   // if opponent got it right, mark user board
   else {
      boxes[data.correctGuessIndex].innerText = "-1";
      opponentPoints++;
      usersTurn = false;
   }

});

socket.on('opponentGuessedWrong', (data) => {
   console.log(data);

   if (usersTurn) {
      opponentBoxes[data.wrongGuessIndex].innerText = "0";
      usersTurn = false;
   }

   else {
      boxes[data.wrongGuessIndex].innerText = "0";
      usersTurn = true;
   }
});

socket.on('winner', (data) => {
   alert(data);
});