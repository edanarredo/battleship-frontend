// Make connection
// var socket = io.connect("http://localhost:3000");

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var board = document.querySelectorAll('div.box');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', () => {
   if (message.value.length > 0) {
      socket.emit('chat', {
         message: message.value,
         handle: handle.value
      });
      message.value = ``;
   }

})

// message.addEventListener('keypress', () => {
//    socket.emit('typing', handle.value);
// })

// // Listen for events
// socket.on('chat', (data) => {
//    feedback.innerHTML = ``;
//    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}`;
// });

// socket.on('typing', (data) => {
//    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
// });

// // Listen for drag events
// socket.on('move circle', (data) => {
//    // listen here
// })
