var Tank = require('./objects/Tank.js');
var Game = require('./Game.js');

var TankGame = function() {
  var that = new Game();

  // Fields
  var players = [];

  // Public methods
  that.addPlayer = function(player, color) {
    var tank = new Tank(0, 0, 0, 0, color);

    var player_data = {
      'player': player,
      'tank': tank
    };

    players.push(player_data);
  };

  return that;
};
