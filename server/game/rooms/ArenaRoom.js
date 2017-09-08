var Tank = require('../objects/Tank.js');
var Room = require('./Room.js');

var ArenaRoom = function() {
  var that = new Room();

  // Fields
  var players = [];
  var tank_data = {};

  // Private methods
  function tick(delta) {
    for(var i=0; i<players.length; i++) {
      var player = players[i];
      player.tank.tick(delta);
      tank_data[players[i].id] = player.tank.getData();
    }    
  };

  function setup() {
    that.onTick(tick);
  };

  // Public methods
  that.addPlayer = function(player, color) {
    var tank = new Tank(0, 0, 0, 0, color);

    var player_data = {
      'id': player.getId(),
      'player': player,
      'tank': tank
    };

    players.push(player_data);
    return tank;
  };

  that.getTankData = function() {
    return tank_data;
  };

  setup();

  return that;
};

module.exports = ArenaRoom;
