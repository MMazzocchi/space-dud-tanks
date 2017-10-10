var SceneSwitcher = function(connection) {
  var that = {};

  // Fields
  var scenes = {};
  var scene = undefined;

  // Private methods
  function setup() {
    connection.onEventType('scene', function(name) {
      if(scenes[name] !== undefined) {
        scene = scenes[name];
      }
    });
  };

  that.update = function() {
    if(scene !== undefined) {
      scene.update(new Date());
    }
  };

  setup();

  return that;
};

module.exports = SceneSwitcher;
