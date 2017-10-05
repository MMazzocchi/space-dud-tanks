var Game = require('./Game.js');
var PassThroughScene = require('./scenes/PassThroughScene.js');
var MultiplayerRoom = require('./rooms/MultiplayerRoom.js');

var TankGame = function(http) {
  var that = new Game(http);
  var room = new MultiplayerRoom();

  // Public functions
  that.playerReady = function(player) {
    PassThroughScene(player);
//    room.addPlayer(player);
  };

  that.addRoom(room);
  return that;
};

module.exports = TankGame;
