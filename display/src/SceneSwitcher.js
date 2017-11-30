var Scene = require('./scene/Scene.js');

var SceneSwitcher = function(connection) {
  var that = {};

  // Fields
  var scenes = {};
  var scene = new Scene();

  // Private methods
  function setup() {
    connection.on('scene', function(data) {
      var name = data.scene;

      if(scenes[name] !== undefined) {
        scene.teardown();

        scene = scenes[name];
        scene.setup();
      } else {
        console.warn("The "+name+" scene was requested, but none exists.");
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
