var GameClient = require('./GameClient.js');
var LogScene = require('./scene/LogScene.js');
var ColorSelectScene = require('./scene/ColorSelectScene.js');
var ControllerSetupScene = require('./scene/ControllerSetupScene.js');
var ArenaScene = require('./scene/ArenaScene.js');
var SceneSwitcher = require('./SceneSwitcher.js');
var CanvasSwitcher = require('./CanvasSwitcher.js');

var TankGameClient = function(parent_component, vr) {
  var that = new GameClient();
  var canvas_switcher = new CanvasSwitcher(parent_component);

  that.connectionReady = function(connection) {
    var scene_switcher = new SceneSwitcher(connection);

    scene_switcher.addScene('controller_setup',
      new ControllerSetupScene(canvas_switcher, connection, vr));
    scene_switcher.addScene('color_select',
      new ColorSelectScene(canvas_switcher, connection, vr));
    scene_switcher.addScene('arena',
      new ArenaScene(canvas_switcher, connection, vr));
  };

  return that;
};

module.exports = TankGameClient;
