var gameMode = '';
var piece_direction = 'east';
var drag_ship_queue = 1;
var boats = { "B": 1, "C": 2, "D": 3, "P": 4, "S": 5 };
var boat_sizes = [4, 5, 3, 2, 3];
var opponentBoard = Array.from(Array(100).keys());

function initPlayerGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
}

function initBotGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
   gameMode = 'singleplayer';
   opponentBoard.forEach(index => { opponentBoard[index] = 0});
}

function placeBoat(boat) {
   return boat;
}

function guessSpace(targetBoard, player) {
   return { targetBoard: targetBoard, player: player };
}

function updateOpponentBoard() {
   if (gameMode == "multiplayer") {
      // webhook
      return true;
   }
   else {
      
      let x = 0, y = 0, opponentPlaceIndex = 0, boat_type = 0;
      let canBePlaced = false;

      boat_sizes.forEach((element, index) => {
         let direction = (Math.random() < .5) ? "east" : "south";
         // For each boat, get an origin coordinate bot guess based on rng direction
         while (!canBePlaced) {
            console.log(element, index, opponentPlaceIndex);
            switch (element) {
               case 2:
                  x = (direction == "east") ? Math.random() * 9 : Math.random() * 10;
                  y = (direction == "east") ? Math.random() * 10 : Math.random() * 9;
                  break;
               case 3:
                  x = (direction == "east") ? Math.random() * 8 : Math.random() * 10;
                  y = (direction == "east") ? Math.random() * 10 : Math.random() * 8;
                  break;
               case 4:
                  x = (direction == "east") ? Math.random() * 7 : Math.random() * 10;
                  y = (direction == "east") ? Math.random() * 10 : Math.random() * 7;
                  break;
               case 5:
                  x = (direction == "east") ? Math.random() * 6 : Math.random() * 10;
                  y = (direction == "east") ? Math.random() * 10 : Math.random() * 6;
                  break;
               default:
                  break;
            }
            // Remove decimals from Math.random
            x = Math.floor(x);
            y = Math.floor(y);
            opponentPlaceIndex = x + 10 * y;
            boat_type = Object.values(boats)[index];
            canBePlaced = boatCanBePlaced(opponentPlaceIndex, x, y, element, direction, "OPPONENT", element);
         }
         console.log(`type: ${boat_type}, x: ${x}, y: ${y}, index: ${index}, canBePlaced${canBePlaced}`);
         insertRemainingBoatPieces(opponentPlaceIndex, boat_type, direction, "OPPONENT", element);
         canBePlaced = false;
      });

   }
}

function boatCanBePlaced(index, x, y, piece_size, direction, board) {
   var canBePlaced = true;

   if (direction == "east") {
      if ((x % 10) + piece_size <= 9) {
         for (let i = 0; i < piece_size; i++) {
            if (opponentBoard[index + i] != 0)
               canBePlaced = false;
         }
      } else {
         canBePlaced = false;
      }
   }
   else if (direction == "south") {
      if ((y + (piece_size - 1) * 10) < 100) {
         for (let i = 0; i < piece_size; i++) {
            if (opponentBoard[index + (10 * i)] != 0)
               canBePlaced = false;
         }
      }
   }
   return canBePlaced;
}

function startBombingPhase() {
   let string = "";
   for (let i = 0; i < 100; i++) {
      if (i % 10 == 0) {
         console.log(string);
         string = "";
      }
      string += ` ${opponentBoard[i]} `;
   }
   return true;
}



