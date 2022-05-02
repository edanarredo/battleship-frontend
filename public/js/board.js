// Game state variables and piece dictionaries
var piece_direction = 'east';
var drag_ship_queue = 1;
var boats = { "B": 1, "C": 2, "D": 3, "P": 4, "S": 5 };
var boat_sizes = [4, 5, 3, 2, 3];

function setupBotOpponentBoard() {
   let x = 0, y = 0, opponentPlaceIndex = 0, boat_type = 0;
   let canBePlaced = false;

   boat_sizes.forEach((element, index) => {
      let direction = (Math.random() < .5) ? "east" : "south";
      while (!canBePlaced) {
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
      insertRemainingBoatPieces(opponentPlaceIndex, boat_type, direction, "OPPONENT", element);
      canBePlaced = false;
   });

   enableBombingButton();
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






