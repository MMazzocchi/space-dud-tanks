var Tank = require('./objects/Tank.js');
var Game = require('./Game.js');

var TankGame = function() {
  var that = new Game();

  // Fields
  var players = [];
  var tank_data = {};

  // Public methods
  that.createTank = function(player, color) {
    var tank = new Tank(0, 0, 0, 0, color);

    var player_data = {
      'id': player.getId();
      'player': player,
      'tank': tank
    };

    players.push(player_data);
    return tank;
  };

  that.tick = function(delta) {
    for(var i=0; i<players.length; i++) {
      tank_data[players[i].id] = tank.getData();
    }    
  };

  return that;
};
