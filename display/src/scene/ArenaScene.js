var TankGameBaseScene = require('./TankGameBaseScene.js');

var ArenaScene = function(canvas_switcher, connection) {
  var that = new TankGameBaseScene(canvas_switcher, connection);

  // Fields
  var scene = that.getScene();
  var camera = that.getCamera();
  var renderer = that.getRenderer();

  that.on('setup', function() {
    canvas_switcher.show3dCanvas();
  });

  that.on('teardown', function() {

  });

  // Public methods
  that.draw = function() {
    renderer.render(scene, camera);
  };

  return that;
};

module.exports = ArenaScene;
