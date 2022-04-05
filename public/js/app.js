const { init } = require("express/lib/application");

// Make connection
var socket = io();

// Get board from DOM
var board = document.getElementById('board');
var menuScreen = document.getElementById('menu');
var createGameBtn = document.getElementById('createGameBtn');
var joinGameBtn = document.getElementById('joinGameBtn');
var lobbyIdInput = document.getElementById('lobbyIdInput');