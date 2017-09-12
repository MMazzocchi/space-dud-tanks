var Tank = require('../objects/Tank.js');
var Room = require('./Room.js');

var ArenaRoom = function() {
  var that = new Room();

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
