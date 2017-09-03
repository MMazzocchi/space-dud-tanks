var Scene = require('./Scene.js');

var PassThroughScene = function(player) {
  var that = new Scene('pass_through');

  // Public functions
  that.start = function() {
    player.onControllerEvent(player.sendEventToConsumers);
  };

  return that;
};

module.exports = PassThroughScene;
