var Game = require('./Game.js');
var MultiplayerRoom = require('./rooms/MultiplayerRoom.js');

var TankGame = function() {
  var that = new Game();
  var room = new MultiplayerRoom();

  // Public functions
  that.playerReady = function(player) {
    room.addPlayer(player);
  };

  return that;
};

module.exports = TankGame;
