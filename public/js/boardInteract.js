// Update position text on web page and return coordinates
function updatePositionText(coordinates) {
   // document.getElementById("pos").innerText = `Square Position(x,y): [${coordinates.xPos}, ${coordinates.yPos}, n]`;
   return true;
}

// Return array of length 100 indicating open and occupied spaces
function getDOMBoard() {
   var result = Array.from(Array(100).keys());

   // Indexes of board with a square in it are marked 1, else 0
   boxes.forEach((item, index) => {
      if (item.childElementCount > 0) {
         if (item.children[0].classList.contains("battleship"))
            result[index] = 1;
         else if (item.children[0].classList.contains("carrier"))
            result[index] = 2;
         else if (item.children[0].classList.contains("destroyer"))
            result[index] = 3;
         else if (item.children[0].classList.contains("patrol"))
            result[index] = 4;
         else if (item.children[0].classList.contains("submarine"))
            result[index] = 5;
      }
      else {
         result[index] = 0;
      }
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

