const HOST = '0.0.0.0';
const PORT = 3000;

var Storyboard = require('./server/Storyboard.js');
var ControllerSetupScene = require('./server/ControllerSetupScene.js');
var PassThroughScene = require('./server/PassThroughScene.js');
var TankSelectScene = require('./server/TankSelectScene.js');
var WaitForConsumerScene = require('./server/WaitForConsumerScene.js');

// Set up the express app and space-dud.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var space_dud = require('space-dud')(http);

var game = space_dud.getGame();
game.onPlayerReady(function(player) {
  var storyboard = new Storyboard(player);

  storyboard.addScene(WaitForConsumerScene);
  storyboard.addScene(ControllerSetupScene);
  storyboard.addScene(TankSelectScene); 
  storyboard.addScene(PassThroughScene); 

  storyboard.start();
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
