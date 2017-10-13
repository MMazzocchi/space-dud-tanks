var GameClient = require('./GameClient.js');
var LogScene = require('./scene/LogScene.js');
var ControllerSetupScene = require('./scene/ControllerSetupScene.js');
var SceneSwitcher = require('./SceneSwitcher.js');

var TankGameClient = function() {
  var that = new GameClient();

  that.connectionReady = function(connection) {
    var scene_switcher = new SceneSwitcher(connection);

    scene_switcher.addScene('controller_setup',
      new ControllerSetupScene(connection));
    scene_switcher.addScene('arena', new LogScene(connection));
  };

  return that;
};

module.exports = TankGameClient;
