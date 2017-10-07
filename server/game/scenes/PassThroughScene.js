var Scene = require('./Scene.js');

var PassThroughScene = function(player) {
  function passThrough(resolve, reject) {
    player.on('controller_event', player.sendEventToConsumers);
  };

  var that = new Scene('pass_through', player, passThrough);
  return that;
};

module.exports = PassThroughScene;
