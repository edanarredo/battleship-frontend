var reverseCheck;
var botGuesses = Array.from(Array(100).keys());
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

      await new Promise(r => setTimeout(r, 1000));

      // Draw a random number from botGuesses[]
      var index = Math.floor(Math.random() * (botGuesses.length + 1));
      var targetValue = userBoard[index];
      botGuesses.splice(botGuesses.indexOf(index), 1);

      // Check tile value and adjust game state if needed.
      if (targetValue > 0) {
         switch (targetValue) {
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
         boxes[index].innerHTML = `<div style="border: 4px solid RED !important; height: 100%; width: 100%;">HIT</div>`;
         userBoard[index] = 0;
      }

      // If a miss, leave marker indicating miss.
      else if (targetValue == 0) {
         boxes[index].innerHTML = `<div style="border: 4px solid YELLOW !important; height: 100%; width: 100%;">MISS</div>`;
         usersTurn = true;
         gameStatus.innerText = "Your turn!";
      } 


   }
}

function tryAdjacent(index) {
   if (!shots.length == 0) {
      var random = Math.floor(Math.random() * 10);
   }
   return true;
}

