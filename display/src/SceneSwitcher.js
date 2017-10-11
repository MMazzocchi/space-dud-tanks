var Scene = require('./Scene.js');

var SceneSwitcher = function(connection) {
  var that = {};

  // Fields
  var scenes = {};
  var scene = new Scene();

  // Private methods
  function setup() {
    connection.onEventType('scene', function(name) {
      if(scenes[name] !== undefined) {
        scene.teardown();

        scene = scenes[name];
        scene.setup();
      }
    });
  };

  that.addScene = function(name, scene) {
    scenes[name] = scene;
  };

  setup();

  return that;
};

module.exports = SceneSwitcher;
