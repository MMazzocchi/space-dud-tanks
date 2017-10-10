var GameClient = require('./GameClient.js');

var TankGameClient = function() {
  var that = new GameClient();

  that.connectionReady = function(connection) {
    var scene_switcher = new SceneSwitcher(connection);

  };

  return that;
};

module.exports = TankGameClient;
