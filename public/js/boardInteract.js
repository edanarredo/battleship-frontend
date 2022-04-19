// Update position text on web page and return coordinates
function updatePositionText(coordinates) {
   document.getElementById("pos").innerText = `Square Position(x,y): [${coordinates.xPos}, ${coordinates.yPos}, n]`;
}

// Return array of length 100 indicating open and occupied spaces
function getDOMBoard() {
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

// Rotate
rotatePieceButton.addEventListener('click', () => {
   let arrowImage = document.getElementById("arrow");

   if (arrowImage.src.includes("east")) {
      arrowImage.src = "./assets/arrow/south.png";
      piece_direction = "south";
   }
   else {
      arrowImage.src = "./assets/arrow/east.png"
      piece_direction = "north";
   }
});

