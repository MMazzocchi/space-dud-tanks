var Game = require('./Game.js');
var ArenaRoom = require('./rooms/ArenaRoom.js');

var TankGame = function() {
  var that = new Game();

  // Private functions
  function setup() {
    that.registerRoom('arena', new ArenaRoom());
  };

  setup();

  return that;
};

module.exports = TankGame;
