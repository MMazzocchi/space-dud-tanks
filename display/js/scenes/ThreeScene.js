var ThreeScene = function() {

  // Static fields
  var renderer = undefined;
  var mobile_renderer = undefined;

  var constructor = function(render_window) {
    var that = new Scene();
  
    // Fields
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
    var controls = new THREE.DeviceOrientationControls(camera);
    var mobile = false;

    // Private functions
    function setup() {
      if(renderer === undefined) {
        renderer = new THREE.WebGLRenderer({ canvas: render_window.get3dCanvas() });
        mobile_renderer = new THREE.StereoEffect(renderer);
      }

      that.onRender(function() {
        if(mobile === true) {
          controls.update();
          mobile_renderer.render(scene, camera);

        } else {
          renderer.render(scene, camera);
        }
      });

      that.onResize(function(width, height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        mobile_renderer.setSize(width, height);
      });

      render_window.show3dCanvas();
    };
  
    // Public functions
    that.setupForMobile = function() {
      mobile = true;
      mobile_renderer.setPixelRatio(window.devicePixelRatio);
    };
  
    that.getCamera = function() { return camera; };
    that.getScene = function() { return scene; };
  
    setup();
  
    return that;
  };

  return constructor;
}();
