var Scene = require('./Scene.js');

var WaitForConsumerScene = function(game_data) {
  var that = new Scene("wait_for_consumer");

  // Fields
  var player = game_data.player;

  // Public functions
  that.start = function() {
    player.onConsumerAdded(function(client_id) {
      that.next();
    });
  };

  return that;
};

module.exports = WaitForConsumerScene;
