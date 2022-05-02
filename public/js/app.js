var socket = io();

// Get important html elements from DOM

var board = document.getElementById('boardMenu');
var menuScreen = document.getElementById('menu');
var createBotGameBtn = document.getElementById('createBotGameBtn');
var createGameBtn = document.getElementById('createGameBtn');
var joinGameBtn = document.getElementById('joinGameBtn');
var lobbyIdInput = document.getElementById('lobbyIdInput');
var startGameBtn = document.getElementById('start');
var commenceBombingStage = document.getElementById('commenceBombing')
var opponentListItem = document.getElementById('opponentListItem');
var rotatePieceButton = document.getElementById('rotatePieceButton');
var boxes = document.querySelectorAll(".box");
var shipBay = document.getElementById("shipBay");
var opponentBoard = Array.from(Array(100).keys());
var userBoard = Array.from(Array(100).keys());
var opponentBoxes = document.querySelectorAll(".boxOpponent");
var lobbyId, gameMode;
var isHost = false;

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
   alert("starting!");
   opponentBoxes = document.querySelectorAll(".boxOpponent");
}

function initBoards() {
   opponentBoard.forEach(index => { opponentBoard[index] = 0 });
   userBoard.forEach(index => { userBoard[index] = 0 });
}
