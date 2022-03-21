// Return array of length 100 indicating open and occupied spaces
function getBoard() {
   var board = document.querySelectorAll("div.box");
   var result = Array.from(Array(100).keys());

   // If there's a childElement, then occupied, else free.
   board.forEach((item, index) => {
      if (item.childElementCount > 0) 
         result[index] = 1;
      else 
         result[index] = 0
   });

   return result;
}
