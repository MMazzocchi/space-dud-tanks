var Scene = function(width, height) {
  var that = {};

  // Fields
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
  var controls = undefined;

  // Public functions
  that.renderStep = function() {};

  that.render = function(renderer) {
    that.renderStep();

    if(controls !== undefined) {
      controls.update();
    }

    renderer.render(scene, camera);
  };

  that.resize = function(new_width, new_height) {
    camera.aspect = new_width / new_height;
    camera.updateProjectionMatrix();
  };

  that.setupForMobile = function() {
    controls = new THREE.DeviceOrientationControls(camera);
  };

  that.getCamera = function() { return camera; };
  that.getScene = function() { return scene; };

  return that;
};
