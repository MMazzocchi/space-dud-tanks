var TankGameClient = require('./TankGameClient.js');
var main = require('./main.js');

$(function() {
  var game_client = new TankGameClient($('body')[0], false);
  main(game_client);
});
