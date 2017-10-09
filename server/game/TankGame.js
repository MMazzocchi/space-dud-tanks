var Game = require('./Game.js');
var PassThroughScene = require('./scenes/PassThroughScene.js');
var MultiplayerRoom = require('./rooms/MultiplayerRoom.js');
var ControllerSetupScene = require('./scenes/ControllerSetupScene.js');
var WaitForConsumerScene = require('./scenes/WaitForConsumerScene.js');

var TankGame = function(http) {
  var that = new Game(http);
  var room = new MultiplayerRoom();

  // Public functions
  that.playerReady = async function(player) {
    await WaitForConsumerScene(player);
    var controller = await ControllerSetupScene(
      player, 'start', 'throttle', 'brake', 'fire', 'left', 'right');
    room.addPlayer(player);
  };

  that.addRoom(room);
  return that;
};

module.exports = TankGame;
