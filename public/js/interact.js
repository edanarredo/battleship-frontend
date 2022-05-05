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
   if (isHost && gameMode == 'multiplayer') 
      bombingButtonDiv.style.display = "block";
   else {
      waitingForHostText.style.display = "block";
   }
}

function enableBombingButton(isHost) {
   if (isHost) 
      bombingBtn.disabled = false;
}

function hideWaitingHUD() {
   bombingButtonDiv.style.display = "none";
   waitingForHostText.style.display = "none";
   newBottomHUD.style.display = "block";
   scoreBoard.style.display = "block";
}