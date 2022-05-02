var socket = io();

// Get important html elements from DOM

var board = document.getElementById('boardMenu');
var menuScreen = document.getElementById('menu');
var createBotGameBtn = document.getElementById('createBotGameBtn');
var createGameBtn = document.getElementById('createGameBtn');
var joinGameBtn = document.getElementById('joinGameBtn');
var lobbyIdInput = document.getElementById('lobbyIdInput');
var startGameBtn = document.getElementById('start');
var bombingStage = document.getElementById('bombingStage');
var bombingBtn = document.getElementById('bombingButton');
var opponentListItem = document.getElementById('opponentListItem');
var rotatePieceButton = document.getElementById('rotatePieceButton');
var boxes = document.querySelectorAll(".box");
var shipBay = document.getElementById("shipBay");
var opponentBoard = Array.from(Array(100).keys());
var userBoard = Array.from(Array(100).keys());
var opponentBoxes = document.querySelectorAll(".boxOpponent");
var gameStatus = document.getElementById("gameStatus");
var lobbyId, gameMode;
var isHost = true;
var usersTurn = true;

function initPlayerGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
   gameMode = 'multiplayer';
   initBoards();
}

function initBotGame() {
   board.style.display = "block";
   menuScreen.style.display = "none";
   gameMode = 'singleplayer';
   initBoards();
}

function startBombingPhase() {
   opponent = (gameMode == "singleplayer") ? "botOpponent" : "playerOpponent";

   // Prevent user from interacting with their board
   for (const box of boxes) {
      box.removeEventListener("dragenter", dragEnter);
      box.removeEventListener("dragleave", dragLeave);
      box.removeEventListener("ondrop", drop);
      box.removeEventListener("ondragover", allowDrop);
   }


   if (usersTurn)
      gameStatus.innerText = "Your turn!";
   else  
      gameStatus.innerText = "Opponent's turn.";

   // // Run Bombing Phase
   // while (opponentPoints != 17 || userPoints != 17) {
   //    guessSpace("user");
   //    guessSpace(opponent);
   // }

   // // Check who won
   // if (userPoints == 17)
   //    showWinnerScreen("user");
   // else  
   //    showWinnerScreen(opponent);

   return true;
}

function initBoards() {
   opponentBoard.forEach(index => { opponentBoard[index] = 0 });
   userBoard.forEach(index => { userBoard[index] = 0 });
}


