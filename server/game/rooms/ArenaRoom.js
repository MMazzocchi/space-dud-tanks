var Tank = require('../objects/Tank.js');
var MultiplayerRoom = require('./MultiplayerRoom.js');

var ArenaRoom = function() {
  var that = new MultiplayerRoom();

  // Fields
  var tanks = [];

  // Public methods
  that.createTank = function(player, color) {
    var tank = new Tank(player.getId(), 0, 0, 0, 0, color);
    tanks.push(tank);

    player.once('disconnect', function() {
      var index = tanks.indexOf(tank);
      tanks.splice(index, 1);
    });

    that.addPlayer(player);

    return tank;
  };

  that.createState = function(now) {
    var tank_data = [];
    for(var i=0; i<tanks.length; i++) {
      tank_data.push(tanks[i].getData());
    }

    var state = {
      'tanks': tank_data
    };

    return state;
  };

  return that;
};

module.exports = ArenaRoom;
