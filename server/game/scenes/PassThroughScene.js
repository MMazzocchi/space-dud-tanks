var setupScene = require('./Scene.js');

var PassThroughScene = function(player) {
  function passThrough() {
    player.on('controller_event', player.sendEventToConsumers);
  };

  return setupScene('pass_through', player).then(passThrough);
};

module.exports = PassThroughScene;
