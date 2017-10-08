var setupScene = require('./Scene.js');

var WaitForConsumerScene = function(player) {
  function waitForConsumer() {
    return new Promise(function(resolve, reject) {
      player.once('consumer_added', function() {
        resolve();
      });
    });
  };

  return setupScene('wait_for_consumer', player).then(waitForConsumer);
};

module.exports = WaitForConsumerScene;
