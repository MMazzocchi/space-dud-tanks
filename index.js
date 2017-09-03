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

var event_types = ['start', 'fire',  'throttle', 'brake',
                   'left',  'right', 'up',       'down' ];

var game = space_dud.getGame();
game.onPlayerReady(function(player) {
  var storyboard = new Storyboard(player);

  storyboard.addScene(new WaitForConsumerScene(player));
  storyboard.addScene(new ControllerSetupScene(player, event_types));
  storyboard.addScene(new TankSelectScene(player)); 
  storyboard.addScene(new PassThroughScene(player)); 

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
