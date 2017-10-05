var Game = require('./Game.js');
var MultiplayerRoom = require('./rooms/MultiplayerRoom.js');

var TankGame = function(http) {
  var that = new Game(http);
  var room = new MultiplayerRoom();

  // Public functions
  that.playerReady = function(player) {
    room.addPlayer(player);
  };

  return that;
};

module.exports = TankGame;
