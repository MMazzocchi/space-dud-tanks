var GameClient = require('./GameClient.js');
var LogScene = require('./scene/LogScene.js');

var TankGameClient = function() {
  var that = new GameClient();

  that.connectionReady = function(connection) {
    var scene_switcher = new SceneSwitcher(connection);
    scene_switcher.addScene('controller_setup', new LogScene(connection));
  };

  return that;
};

module.exports = TankGameClient;
