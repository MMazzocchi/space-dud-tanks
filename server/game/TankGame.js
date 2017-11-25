var Game = require('./Game.js');
var ArenaRoom = require('./rooms/ArenaRoom.js');
var ControllerSetupScene = require('./scenes/ControllerSetupScene.js');
var WaitForConsumerScene = require('./scenes/WaitForConsumerScene.js');
var ArenaScene = require('./scenes/ArenaScene.js');
var ColorSelectScene = require('./scenes/ColorSelectScene.js');

var TankGame = function(http) {
  var that = new Game(http);
  var room = new ArenaRoom();

  const EVENT_TYPES = ['start', 'throttle', 'brake', 'fire', 'left', 'right'];

  // Public functions
  that.playerReady = async function(player) {

                     await WaitForConsumerScene(player);
    var controller = await ControllerSetupScene(player, ...EVENT_TYPES);
    var color      = await ColorSelectScene(player, controller);
                     await ArenaScene(player, color, controller, room);
  };

  that.addRoom(room);
  return that;
};

module.exports = TankGame;
