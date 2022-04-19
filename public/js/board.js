var gameMode = '';
var piece_direction = 'east';
var drag_ship_queue = 1;

class Game {
   constructor(gameMode) {
      this.gameMode = gameMode;
      this.player1Board = Array.from(Array(10), () => new Array(10));
      this.player2Board = Array.from(Array(10), () => new Array(10));
   }
}

function initPlayerGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
}

function initBotGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
   gameMode = 'singleplayer';
}

function placeBoat(boat) {
   return boat;
}

function guessSpace(targetBoard, player) {
   return { targetBoard: targetBoard, player: player };
}



