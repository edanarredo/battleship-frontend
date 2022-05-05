// Create Game Button
createGameBtn.addEventListener('click', () => {
   socket.emit('createGame', "create");
   isHost = true;
   usersTurn = true;
});

// Join Game Button
joinGameBtn.addEventListener('click', () => {
   const code = lobbyIdInput.value;
   lobbyId = code;
   isHost = false;
   usersTurn = false;
   socket.emit('joinGame', { code: code });
});

// Start Game Button
startGameBtn.addEventListener('click', () => {
   socket.emit('startGame', { lobbyId: lobbyId });
   gameMode = 'multiplayer';
});

bombingBtn.addEventListener('click', () => {
   socket.emit('startBombing', { lobbyId: lobbyId });
});

function uploadBoard() {
   if (gameMode == 'multiplayer') {
      socket.emit('postBoard', {
         board: userBoard,
         roomId: lobbyId,
         userId: userId
      });
   }
   newBottomHUD.style.display = "block";
   showBombingButton();
}

// Receive room status after menu interaction
socket.on('roomStatus', (data) => {
   console.log(data);
   if (data.status == true) {
      lobbyId = data.roomId;
      userId = data.host;
      document.getElementById("lobbyId").innerText = `Your Game Lobby ID: ${lobbyId}`;
   }
   else
      alert('Something went wrong. Try again.');
});

// Receive that game is in a ready state and enable start button
socket.on('gameReady', (data) => {
   let spinner = document.getElementById("loader");
   document.getElementById("opponentListItem").removeChild(spinner);
   document.getElementById("lobbyId").innerText = `Your Game Lobby ID: ${data.roomId}`;
   opponentListItem.innerText = "Player 2";
   startGameBtn.disabled = false;
   startGameBtn.classList.remove("btn-danger");
   startGameBtn.classList.add("btn-primary");
   opponentId = (data.host == userId) ? data.guest : data.host;
});

// Receive flag to start game.
socket.on('startGame', (data) => {
   if (isHost) {
      let modalElementHost = document.getElementById("exampleModal");
      let modal = bootstrap.Modal.getInstance(modalElementHost);
      modal.hide();
   }
   else {
      let modalElementJoiner = document.getElementById("exampleModal2");
      let modal2 = bootstrap.Modal.getInstance(modalElementJoiner);
      modal2.hide();
   }
   initPlayerGame();
});

socket.on('boardCompleteAlert', (data) => {
   document.getElementById("opponentStatus").style.backgroundColor = "green";
   enableBombingButton(isHost);
});

socket.on('startBombing', (data) => {
   startBombingPhase();
});

socket.on('join', (data) => {
   userId = data.id;
});

socket.on('inviteError', (data) => {
   alert("Invite code did not work. Try another one.");
})