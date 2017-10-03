var Scene = require('./Scene.js');
var StereoEffect = require('../../lib/StereoEffect.js');

var ThreeScene = function() {

  // Static fields
  var renderer = undefined;
  var mobile_renderer = undefined;

  var constructor = function(render_window) {
    var that = new Scene();
  
    // Fields
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
    var mobile = false;

    // Private functions
    function setup() {
      if(renderer === undefined) {
        renderer = new THREE.WebGLRenderer({ canvas: render_window.get3dCanvas() });
        mobile_renderer = new THREE.StereoEffect(renderer);
      }

      that.on('render', function() {
        if(mobile === true) {
          mobile_renderer.render(scene, camera);

        } else {
          renderer.render(scene, camera);
        }
      });

      that.on('resize', function(width, height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        mobile_renderer.setSize(width, height);
      });

      that.on('setup_for_mobile', function() {
        mobile = true;
        mobile_renderer.setPixelRatio(window.devicePixelRatio);
      });

      render_window.show3dCanvas();
    };
  
    // Public functions
    that.getCamera = function() { return camera; };
    that.getScene = function() { return scene; };
  
    setup();
  
    return that;
  };

  return constructor;
}();

module.exports = ThreeScene;
