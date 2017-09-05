var RealTimeScene = require('./RealTimeScene.js');

var ArenaScene = function(game_data) {
  var that = new RealTimeScene('arena', game_data);

  // Fields
  var controller = game_data.controller;
  var player = game_data.player;
  var tank_color = game_data.tank_color;
  var game = game_data.game;
  var tank = undefined;

  // Private methods
  var rt_start = that.start;

  function setup() {
    tank = game.createTank(player, tank_color);
  };

  // Public methods
  that.start = function() {
    controller.resetEventMappings();
    rt_start();
  };

  that.getStateData = function() {
    return game.getTankData();
  };

  setup();

  return that;
};

module.exports = ArenaScene;
