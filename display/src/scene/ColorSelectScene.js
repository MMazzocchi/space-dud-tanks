var LogScene = require('./LogScene.js');
var AnimatedScene = require('./AnimatedScene.js');
var THREE = require('../../lib/three.min.js');

var ColorSelectScene = function(canvas_switcher, connection) {
  var that = AnimatedScene.mixin(new LogScene(connection));
  var canvas = canvas_switcher.get3dCanvas();

  // Fields
  var width = canvas.width;
  var height = canvas.height;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas });
  
  // Private methods
  function resize() {
    width = canvas.width;
    height = canvas.height;

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  that.on('setup', function() {
    canvas_switcher.show3dCanvas();
  });

  // Public methods
  that.draw = function() {
    if((canvas.width  !== width ) ||
       (canvas.height !== height)) {
      resize();
    }

    renderer.render(scene, camera);
  };

  resize();

  return that;
};

module.exports = ColorSelectScene;
