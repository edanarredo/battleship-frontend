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
  var chosenIndexToPlace = parseInt(ev.target.dataset.indexPlayer);
  var chosenIndexX = chosenIndexToPlace % 10;
  var chosenIndexY = Math.floor(chosenIndexToPlace / 9);
  var boatPlaceable = boatCanBePlaced(chosenIndexToPlace, chosenIndexX, chosenIndexY, boat_sizes[drag_ship_queue-1], piece_direction, "user");
  
  if (ev.target.innerText || !boatPlaceable) { //|| !boatPlaceable
    alert("You can't place there!");
    if (ev.target.classList.contains("dark"))
      ev.target.className = "box dark";
    else
      ev.target.className = "box";
    return;
  }

  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  if (ev.target.classList.contains("dark"))
    ev.target.className = "box dark";
  else
    ev.target.className = "box";

  let result = getLastPlacedPieceCoordinates();
  insertRemainingBoatPieces(result.index, drag_ship_queue, piece_direction, "SELF", boat_sizes[drag_ship_queue - 1]);
  placeNextPiece(drag_ship_queue);
}

// Get coordinates of piece that was just moved.
function getLastPlacedPieceCoordinates() {

  let board = getDOMBoard();
  let x_coord, y_coord, big_index;

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

function placeNextPiece(boat_number) {
  switch (boat_number) {
    case 1:
      document.querySelector(".carrier").style.display = "block";
      shipLengthText.innerText = "Length: 5 tiles";
      break;
    case 2:
      document.querySelector(".destroyer").style.display = "block";
      shipLengthText.innerText = "Length: 3 tiles";
      break;
    case 3:
      document.querySelector(".patrol").style.display = "block";
      shipLengthText.innerText = "Length: 2 tiles";
      break;
    case 4:
      document.querySelector(".submarine").style.display = "block";
      shipLengthText.innerText = "Length: 3 tiles";
      break;
    default:
      document.getElementById("userStatus").style.backgroundColor = "green";
      shipPlaceMenu.style.display = "none";
      shipLengthText.style.display = "none";

      if (gameMode == 'multiplayer') {
        uploadBoard();
      }
      else {
        setupBotOpponentBoard();
        startBombingPhase();
      }
      break;
  }
  drag_ship_queue++;
}

// Update the position of the square block
function insertRemainingBoatPieces(index, piece_type, piece_direction, board, piece_length) {
  let piece_index_board_spot = 0;

  // for each size unit of boat
  for (let piece_index = 0; piece_index < piece_length; piece_index++) {
    piece_index_board_spot = (piece_direction == "south") ? (10 * piece_index) + index : piece_index + index;
    if (board == "SELF") {
      let piece_img_path = getPieceImage(piece_index, piece_type, piece_direction);
      console.log(piece_img_path);
      // boxes[piece_index_board_spot].innerHTML = `<div style="background: url(${piece_img_path}); background-repeat: no-repeat;" >${piece_type}</div>`;
      boxes[piece_index_board_spot].innerHTML = `<div style="border: 4px solid #60a4a2 !important; height: 100%; width: 100%;" background-repeat: no-repeat;" >${piece_type}</div>`;
      userBoard[piece_index_board_spot] = piece_type;
    }
    else if (board == "OPPONENT")
      opponentBoard[piece_index_board_spot] = piece_type;
  }
}