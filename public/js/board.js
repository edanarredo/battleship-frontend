// Initialize Game State and Render Boards
function init() {
   board.style.display = "block";
   menu_screen.style.display = "none";
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

// Update position text on web page and return coordinates
function updatePositionText(coordinates) {
   document.getElementById("pos").innerText = `Square Position(x,y): [${coordinates.xPos}, ${coordinates.yPos}, n]`;
}

function startBotGame() {
   // need to add code to run local game
   return true;
}

