const HOST = '0.0.0.0';
const PORT = 3000;

var TankGame = require('./server/game/TankGame.js');
var Storyboard = require('./server/player/Storyboard.js');

var ControllerSetupScene =
  require('./server/player/scenes/ControllerSetupScene.js');
var PassThroughScene = require('./server/player/scenes/PassThroughScene.js');
var TankSelectScene = require('./server/player/scenes/TankSelectScene.js');
var WaitForConsumerScene =
  require('./server/player/scenes/WaitForConsumerScene.js');
var ArenaScene = require('./server/player/scenes/ArenaScene.js');

// Set up the express app and space-dud.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var space_dud = require('space-dud')(http);

var game = new TankGame();
game.start();

space_dud.getGame().onPlayerReady(function(player) {
  var storyboard = new Storyboard(player, game);

  storyboard.addScene(WaitForConsumerScene);
  storyboard.addScene(ControllerSetupScene);
  storyboard.addScene(TankSelectScene); 
  storyboard.addScene(ArenaScene); 

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
