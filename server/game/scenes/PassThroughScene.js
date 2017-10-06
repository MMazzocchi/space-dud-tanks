var Scene = require('./Scene.js');

var PassThroughScene = function(player) {

  function setupPassThrough() {
    return new Promise(function(resolve, reject) {
      player.on('controller_event', player.sendEventToConsumers);
    });
  };

  Scene('pass_through', player).then(setupPassThrough);
};

module.exports = PassThroughScene;
