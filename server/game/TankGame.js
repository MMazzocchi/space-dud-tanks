var Game = require('./Game.js');
var MultiplayerRoom = require('./rooms/MultiplayerRoom.js');
var ControllerSetupScene = require('./scenes/ControllerSetupScene.js');
var WaitForConsumerScene = require('./scenes/WaitForConsumerScene.js');
var ArenaScene = require('./scenes/ArenaScene.js');

var TankGame = function(http) {
  var that = new Game(http);
  var room = new MultiplayerRoom();

  const EVENT_TYPES = ['start', 'throttle', 'brake', 'fire', 'left', 'right'];

  // Public functions
  that.playerReady = async function(player) {

                     await WaitForConsumerScene(player);
    var controller = await ControllerSetupScene(player, ...EVENT_TYPES);
                     await ArenaScene(player, room);
  };

  that.addRoom(room);
  return that;
};

module.exports = TankGame;
