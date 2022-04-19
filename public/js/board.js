var gameMode = '';
var piece_direction = 'east';
var drag_ship_queue = 1;
var boats = {"B": 1, "C": 2, "D": 3, "P": 4, "S": 5};
var boat_sizes = [4,5,3,2,3];

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



