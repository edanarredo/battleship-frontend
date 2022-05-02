// Rotate
rotatePieceButton.addEventListener('click', () => {
   let arrowImage = document.getElementById("arrow");

   if (arrowImage.src.includes("east")) {
      arrowImage.src = "./assets/arrow/south.png";
      piece_direction = "south";
   }
   else {
      arrowImage.src = "./assets/arrow/east.png"
      piece_direction = "east";
   }
});

function becomeHost() {
   isHost = true;
}

function surrenderHost() {
   isHost = false;
}

function showBombingButton() {
   commenceBombingStage.style.display = "block";
}

function enableBombingButton() {
   commenceBombingStage.disabled = false;
}