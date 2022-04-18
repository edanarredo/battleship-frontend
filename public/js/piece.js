// Code for piece logic goes here

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
   let result = getPlacedSquareCoordinate();
 }

// Get coordinates of piece that was just moved.
function getPlacedSquareCoordinate() {

  // Initialize Variables
  let board = getDOMBoard();
  let x_coord = 0;
  let y_coord = 0;
  let big_index = 0;
  
  // Find x and y position of placed square
  board.forEach((item, index) => {
     if (item == 1) {
        x_coord = index <= 9 ? index : (index % 10);
        y_coord = Math.floor(index / 10);
        big_index = index;
     }
  });
  
  return { xPos: x_coord, yPos: y_coord, index: big_index };
}

// Update the position of the square block
function updateSquarePosition(x_coord, y_coord, index, piece_direction) {
  let currentPosition = getPlacedSquareCoordinate();

  // If new coordinate and current not the same, update position
  if (currentPosition.xPos != x_coord && currentPosition.yPos != y_coord) {
    var board = document.querySelectorAll("div.box");
    board[currentPosition.index].innerHTML = ``; 
    board[index].innerHTML = `<div draggable="true" ondragstart="drag(event)" id="drag"></div>`; 
  }
}

