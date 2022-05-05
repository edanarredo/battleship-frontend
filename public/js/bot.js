var reverseCheck;
var botGuesses = Array.from(Array(100).keys());
var botAttemptedIndexes = [];
var attempts = 0;

async function botGuess() {
   gameStatus.innerText = "Opponent's turn.";
   while (!usersTurn) {
      await new Promise(r => setTimeout(r, 1000));
      // Pick random tile that has not been guessed yet.
      var unpickedTilesForGuess = botGuesses.filter(item => !botAttemptedIndexes.includes(item))
      var randomIndex = Math.floor(Math.random() * (unpickedTilesForGuess.length + 1));
      var unpickedTileIndex = unpickedTilesForGuess[randomIndex];
      var targetTileValue = userBoard[unpickedTileIndex];
      botAttemptedIndexes.push(unpickedTileIndex);

      // Check tile value and adjust game state if needed.
      if (targetTileValue > 0) {
         adjustBoatHealth(targetTileValue, "user");
         // Leave marker indicating hit.
         boxes[unpickedTileIndex].innerHTML = `<div style="border: 4px solid #ff3d3d !important; height: 100%; width: 100%; font-size: 10px;">HIT</div>`;
         userBoard[unpickedTileIndex] = -1;
      }

      // If a miss, leave marker indicating miss.
      else if (targetTileValue == 0) {
         boxes[unpickedTileIndex].innerHTML = `<div style="border: 4px solid #ffdc74 !important; height: 100%; width: 100%; font-size: 10px;">MISS</div>`;
         usersTurn = true;
         gameStatus.innerText = "Your turn!";
      }

      attempts++;
   }
}

function tryAdjacent(index) {
   if (!shots.length == 0) {
      var random = Math.floor(Math.random() * 10);
   }
   return true;
}


