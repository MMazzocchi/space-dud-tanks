var Scene = require('./Scene.js');

var PassThroughScene = function(game_data) {
  var that = new Scene('pass_through');

  // Fields
  var player = game_data.player;

  // Public functions
  that.start = function() {
    player.onControllerEvent(player.sendEventToConsumers);
  };

  return that;
};

module.exports = PassThroughScene;
