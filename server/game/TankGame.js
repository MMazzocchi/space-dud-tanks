var Game = require('./Game.js');
var ArenaRoom = require('./rooms/ArenaRoom.js');

var TankGame = function() {
  var that = new Game();
  var arena = new ArenaRoom();

  // Public functions
  that.addPlayer = function(player, color) {
    return arena.addPlayer(player, color);
  };

  return that;
};

module.exports = TankGame;
