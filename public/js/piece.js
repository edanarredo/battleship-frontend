// Code for piece logic goes here
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dragEnter(ev) {
  ev.preventDefault();
  this.className += " hovered";
}

function dragLeave(ev) {
  ev.preventDefault();
  if (this.classList.contains("dark"))
    this.className = "box dark";
  else
    this.className = "box";
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  ev.target.appendChild(document.getElementById(data));

  if (ev.target.classList.contains("dark"))
    ev.target.className = "box dark";
  else
    ev.target.className = "box";

  let result = getPlacedSquareCoordinate();
  console.log(result);
  insertRemainingBoatPieces(result.index, drag_ship_queue, piece_direction);
  replaceBoatPanel(drag_ship_queue);
}

for (const box of boxes) {
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragleave", dragLeave);
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
    if (item == drag_ship_queue) {
      x_coord = index <= 9 ? index : (index % 10);
      y_coord = Math.floor(index / 10);
      big_index = index;
    }
  });

  return { xPos: x_coord, yPos: y_coord, index: big_index };
}

function replaceBoatPanel(boat_number) {
  switch (boat_number) {
    case 1:
      document.querySelector(".carrier").style.display = "block";
      break;
    case 2:
      document.querySelector(".destroyer").style.display = "block";
      break;
    case 3:
      document.querySelector(".patrol").style.display = "block";
      break;
    case 4:
      document.querySelector(".submarine").style.display = "block";
      break;
    default:
      makeBotBoard();
      startBombingPhase();
      break;
  }
  drag_ship_queue++;
}

// Update the position of the square block
function insertRemainingBoatPieces(index, piece_type, piece_direction) {
  let currentBoard = getDOMBoard();
  let piece_index_board_spot = 0;

  // for each size unit of boat
  for (let piece_index = 0; piece_index < boat_sizes[drag_ship_queue-1]; piece_index++) {
    piece_index_board_spot = (piece_direction == "south") ? (10 * piece_index) + index : piece_index + index;
    let piece_img_path = getPieceImage(piece_index, piece_type, piece_direction);
    boxes[piece_index_board_spot].innerHTML = `<div style="background: url(${piece_img_path}); background-repeat: no-repeat;" >${piece_type}</div>`;
    console.log("ok");
  }
}

function getPieceImage(index, piece_type, piece_direction) {
  let tile_img_path = "";
  let directory = (piece_direction == "south" ? `"../assets/Vertical/` : `"../assets/Horizontal/`);

  switch (piece_type) {
    case 1:
      tile_img_path = `${directory}4/4_${index}.png"`;
      break;
    case 2:
      tile_img_path = `${directory}5/5_${index}.png"`;
      break;
    case 3:
      tile_img_path = `${directory}3A/3A_${index}.png"`;
      break;
    case 4:
      tile_img_path = `${directory}2/2_${index}.png"`;
      break;
    case 5:
      tile_img_path = `${directory}3B/3B_${index}.png"`;
      break;
    default:
      break;
  }
  console.log(tile_img_path);
  return tile_img_path;
}