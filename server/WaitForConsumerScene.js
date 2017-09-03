var Scene = require('./Scene.js');

var WaitForConsumerScene = function(player) {
  var that = new Scene("wait_for_consumer");

  // Public functions
  that.start = function() {
    player.onConsumerAdded(function(client_id) {
      that.next();
    });
  };

  return that;
};

module.exports = WaitForConsumerScene;
