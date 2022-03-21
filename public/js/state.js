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
