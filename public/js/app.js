var socket = io();
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
var all_ship_statuses = {
   user: {
      'B': 4,
      'C': 5,
      'D': 3,
      'P': 2,
      'S': 3
   },
   opponent: {
      'B': 4,
      'C': 5,
      'D': 3,
      'P': 2,
      'S': 3
   }
};


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

   for (const box of boxes) {
      box.addEventListener("dragenter", dragEnter);
      box.addEventListener("dragleave", dragLeave);
   }

   for (let i = 0; i < 100; i++) {
      opponentBoxes[i].setAttribute('data-index', `${i}`);
      boxes[i].setAttribute('data-index-player', `${i}`);
   }
}

function adjustBoatHealth(tileBoatValue, player) {
   if (player == "user") 
      opponentPoints++;
   else
      userPoints++;

   let boardHealthListIndex = tileBoatValue - 1;
   let targetBoatHealth;

   switch (tileBoatValue) {
      case 1:
         all_ship_statuses[player]['B']--;
         targetBoatHealth = all_ship_statuses[player]['B'];
         break;
      case 2:
         all_ship_statuses[player]['C']--;
         targetBoatHealth = all_ship_statuses[player]['C'];
         break;
      case 3:
         all_ship_statuses[player]['D']--;
         targetBoatHealth = all_ship_statuses[player]['D'];
         break;
      case 4:
         all_ship_statuses[player]['P']--;
         targetBoatHealth = all_ship_statuses[player]['P'];
         break;
      case 5:
         all_ship_statuses[player]['S']--;
         targetBoatHealth = all_ship_statuses[player]['S'];
         break;
      default:
         break;
   }

   literalScoreText.innerText = `${userPoints}   ${opponentPoints}`;
   let deadShip = "🟥";

   if (targetBoatHealth == 0) {
      if (player == "user")
         userBoatHealthList[boardHealthListIndex].innerText =  deadShip.repeat(boat_sizes[tileBoatValue-1]);
      else
         opponentBoatHealthList[boardHealthListIndex].innerText = deadShip.repeat(boat_sizes[tileBoatValue-1]);
   }
}

async function checkWinner() {
   let userFleetSize = Object.values(all_ship_statuses.user);
   let opponentFleetSize = Object.values(all_ship_statuses.opponent);

   var userIsDead = userFleetSize.reduce((a, b) => a + b) == 0;
   var opponentIsDead = opponentFleetSize.reduce((a, b) => a + b) == 0;

   var result;

   if (userIsDead || opponentPoints == 17)
      result = { winner: "Opponent", gameOver: true };
   else if (opponentIsDead || userPoints == 17)
      result = { winner: "User", gameOver: true };
   else {
      result = { winner: "None", gameOver: false };
      return result;
   }

   gameStatus.innerText = `${result.winner == "Opponent" ? "Your Opponent" : "You"} won!`;

   if (result.winner == "Opponent") {
      table.classList.remove('bg-light');
      table.classList.add('lose');
      newBottomHUD.classList.remove('bg-light');
      newBottomHUD.classList.add('lose');
   } else {
      table.classList.remove('bg-light');
      table.classList.add('win');
      newBottomHUD.classList.remove('bg-light');
      newBottomHUD.classList.add('win');
   }

   // Wait 5 seconds and open game over modal
   await new Promise(r => setTimeout(r, 3000));
   openRestartModal();
   return result;
}