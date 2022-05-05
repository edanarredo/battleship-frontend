var socket = io();

// Get important html elements from DOM

var board = document.getElementById('boardMenu');
var table = document.getElementById('board');
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
var rotateArrowTable = document.getElementById('rotateArrowMenu');
var boxes = document.querySelectorAll(".box");
var shipBay = document.getElementById("shipBay");
var opponentBoard = Array.from(Array(100).keys());
var userBoard = Array.from(Array(100).keys());
var opponentBoxes = document.querySelectorAll(".boxOpponent");
var gameStatus = document.getElementById("gameStatus");
var shipPlaceMenu = document.getElementById("shipPlaceMenu");
var newBottomHUD = document.getElementById("newBottomHUD");
var scoreBoard = document.getElementById('scoreBoard');
var literalScoreText = document.getElementById('literalScoreText');
var userBoatHealthList= document.getElementById('userHealth').getElementsByTagName("li");
var opponentBoatHealthList = document.getElementById('opponentHealth').getElementsByTagName("li");
var waitingForHostText = document.getElementById("waitingForHostText");
var bombingButtonDiv = document.getElementById("bombingButtomDiv");
var shipLengthText = document.getElementById("shipLengthText");
var lobbyId, gameMode, userId, opponentId;
var isHost = true;
var usersTurn = false;

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
   usersTurn = true;
   initBoards();
}

function startBombingPhase() {
   if (usersTurn)
      gameStatus.innerText = "Your turn!";
   else {
      gameStatus.innerText = "Opponent's turn.";
   }
   hideWaitingHUD();
   return true;
}

function initBoards() {
   opponentBoard.forEach(index => { opponentBoard[index] = 0 });
   userBoard.forEach(index => { userBoard[index] = 0 });
}