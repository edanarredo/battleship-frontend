function allowDrop(ev) {
   ev.preventDefault();
 }
 
 function drag(ev) {
   ev.dataTransfer.setData("text", ev.target.id);
 }
 
 function drop(ev) {
   ev.preventDefault();
   var data = ev.dataTransfer.getData("text");
   ev.target.appendChild(document.getElementById(data));
   let result = getPlacedPieceCoordinate();
 }

function getPlacedPieceCoordinate() {
  let board = getBoard();
  let x_coord = 0;
  let y_coord = 0;
  
  // Find x and y position of placed square
  board.forEach((item, index) => {
     if (item == 1) {
        x_coord = index <= 9 ? index : (index % 10);
        y_coord = Math.floor(index / 10);
     }
  });

  document.getElementById("pos").innerText = `Square Position(x,y): [${x_coord}, ${y_coord}]`;
  return [x_coord, y_coord];
}

