var Tank = require('../objects/Tank.js');
var Room = require('./Room.js');

var ArenaRoom = function() {
  const TICK_INTERVAL = 16;
  const STATE_INTERVAL = TICK_INTERVAL*6;

  var that = new Room(TICK_INTERVAL, STATE_INTERVAL);

  // Private methods
  var superAddPlayer = that.addPlayer;

  // Public methods
  that.addPlayer = function(player, color) {
    var tank = new Tank(player.getId(), 0, 0, 0, 0, color);
    that.addObject(tank);

    superAddPlayer(player);
    return tank;
  };

  return that;
};

module.exports = ArenaRoom;
