var Scene = require('./Scene.js');

var WaitForConsumerScene = function(player) {
  var that = new Scene("wait_for_consumer");

  // Public functions
  that.start = function() {
    console.log("Waiting for display client...");

    player.onConsumerAdded(function() {
      console.log("Consumer added, let's go!");
      that.next();
    });
  };

  return that;
};

module.exports = WaitForConsumerScene;
