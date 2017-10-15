var GameClient = require('./GameClient.js');
var LogScene = require('./scene/LogScene.js');
var ColorSelectScene = require('./scene/ColorSelectScene.js');
var ControllerSetupScene = require('./scene/ControllerSetupScene.js');
var SceneSwitcher = require('./SceneSwitcher.js');

var TankGameClient = function(canvas) {
  var that = new GameClient();

  that.connectionReady = function(connection) {
    var scene_switcher = new SceneSwitcher(connection);

    scene_switcher.addScene('controller_setup',
      new ControllerSetupScene(canvas, connection));
    scene_switcher.addScene('arena', new ColorSelectScene(canvas, connection));
  };

  return that;
};

module.exports = TankGameClient;
