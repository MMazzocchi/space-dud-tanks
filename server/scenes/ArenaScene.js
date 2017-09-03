var Scene = require('./Scene.js');

var ArenaScene = function(game_data) {
  var that = new Scene('arena');

  // Fields
  var controller = game_data.controller;
  var player = game_data.player;
  var tank_color = game_data.tank_color;

  // Private methods

  // Public methods
  that.start = function() {
    controller.resetEventMappings();
  };

  return that;
};

module.exports = ArenaScene;
