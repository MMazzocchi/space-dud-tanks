const HOST = '0.0.0.0';
const PORT = 3000;

// Set up the express app and space-dud.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var space_dud = require('space-dud')(http);

var game = space_dud.getGame();
game.onPlayerReady(function(player) {
  player.onControllerEvent(player.sendEventToConsumers);
});

space_dud.start();

// Serve the static client files.
app.use('/controller.html', express.static(__dirname+'/controller.html'));
app.use('/', express.static(__dirname+'/display/'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 

// Start the server.
http.listen(PORT, HOST, function(){
  console.log('listening on '+HOST+':'+PORT);
});
