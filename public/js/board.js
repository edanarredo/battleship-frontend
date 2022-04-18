// Initialize Game State and Render Boards
function initPlayerGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
}

// Initialize Game State and Render Boards for bot game
function initBotGame() {
   // need to add code to run local game
   return true;
}

// Place boat phase
function placeBoats() {
   return true;
}

// Guess space phase
function guessSpace(targetBoard, player) {
   return { targetBoard: targetBoard, player: player };
}

// Update position text on web page and return coordinates
function updatePositionText(coordinates) {
   document.getElementById("pos").innerText = `Square Position(x,y): [${coordinates.xPos}, ${coordinates.yPos}, n]`;
}

// Return array of length 100 indicating open and occupied spaces
function getBoard() {
   var board = document.querySelectorAll("div.box");
   var result = Array.from(Array(100).keys());

   // Indexes of board with a square in it are marked 1, else 0
   board.forEach((item, index) => {
      if (item.childElementCount > 0)
         result[index] = 1;
      else
         result[index] = 0
   });

   return result;
}


