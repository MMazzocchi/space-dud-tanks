var OrientationThreeScene = function(render_window) {
  var that = new ThreeScene(render_window);

  // Fields
  var camera = that.getCamera();
  var controls = new THREE.DeviceOrientationControls(camera);
  var mobile = false;

  that.onRender(function() {
    if(mobile === true) {
      controls.update();
    }
  });

  that.onSetupForMobile(function() {
    mobile = true;
  });

  return that;
};
