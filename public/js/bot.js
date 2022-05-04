var reverseCheck;
var botGuesses = Array.from(Array(100).keys());
var botAttemptedIndexes = [];
var attempts = 0;

// B, C, D, P, S
// 1, 2, 3, 4, 6
var all_ship_statuses = {
   user: {
      'B': 4,
      'C': 5,
      'D': 3,
      'P': 2,
      'S': 3
   },
   opponent: {
      'B': 4,
      'C': 5,
      'D': 3,
      'P': 2,
      'S': 3
   }
};


async function botGuess() {

   gameStatus.innerText = "Opponent's turn.";
   while (!usersTurn) {

      // Pick random tile that has not been guessed yet.
      var unpickedTilesForGuess = botGuesses.filter(item => !botAttemptedIndexes.includes(item))
      var randomIndex = Math.floor(Math.random() * (unpickedTilesForGuess.length + 1));
      var unpickedTileIndex = unpickedTilesForGuess[randomIndex];
      var targetTileValue = userBoard[unpickedTileIndex];
      botAttemptedIndexes.push(unpickedTileIndex);

      // Check tile value and adjust game state if needed.
      if (targetTileValue > 0) {
         switch (targetTileValue) {
            case 1:
               all_ship_statuses.user['B']--;
               opponentPoints++;
               break;
            case 2:
               all_ship_statuses.user['C']--;
               opponentPoints++;
               break;
            case 3:
               all_ship_statuses.user['D']--;
               opponentPoints++;
               break;
            case 4:
               all_ship_statuses.user['P']--;
               opponentPoints++;
               break;
            case 5:
               all_ship_statuses.user['S']--;
               opponentPoints++;
               break;
            default:
               break;
         }
         // Leave marker indicating hit.
         boxes[unpickedTileIndex].innerHTML = `<div style="border: 4px solid RED !important; height: 100%; width: 100%;">HIT</div>`;
         userBoard[unpickedTileIndex] = -1;
      }

      // If a miss, leave marker indicating miss.
      else if (targetTileValue == 0) {
         boxes[unpickedTileIndex].innerHTML = `<div style="border: 4px solid YELLOW !important; height: 100%; width: 100%;">MISS</div>`;
         usersTurn = true;
         gameStatus.innerText = "Your turn!";
      }

      attempts++;
      await new Promise(r => setTimeout(r, 1000));
   }
}

function tryAdjacent(index) {
   if (!shots.length == 0) {
      var random = Math.floor(Math.random() * 10);
   }
   return true;
}

