var Scene = require('./Scene.js');

var ArenaScene = function(game_data) {
  var that = new Scene('arena');

  // Fields
  var controller = game_data.controller;
  var player = game_data.player;
  var tank_color = game_data.tank_color;
  var room = game_data.game.getRoom('arena');
  var tank = undefined;

  // Private methods
  function setup() {
    controller.removeAllListeners();
    tank = room.addPlayer(player, tank_color);
  };

  function setupController() {
    controller.on('left', tank.left);
    controller.on('right', tank.right);
    controller.on('fire', tank.fire);
    controller.on('throttle', tank.throttle);
    controller.on('brake', tank.brake);
  };

  // Public methods
  that.start = function() {
    setupController(); 
  };

  setup();

  return that;
};

module.exports = ArenaScene;
