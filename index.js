// Import the Express module
var express = require('express');

// Import a Logger
var morgan = require('morgan');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the YouTube Party game file - we are treating this as another server-side node module.
var yt = require('./server/game.io');

// Serve static html, js, css, and image files from the 'client' directory
app.use(express.static(path.join(__dirname,'client')));

// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
  console.log('client connected');
  console.log(socket.id);
  yt.initGame(io, socket);
});


