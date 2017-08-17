var Scene = function() {
  var that = {};

  // Fields
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
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

  that.resize = function(width, height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  that.setupForMobile = function() {
    controls = new THREE.DeviceOrientationControls(camera);
  };

  that.getCamera = function() { return camera; };
  that.getScene = function() { return scene; };

  return that;
};
