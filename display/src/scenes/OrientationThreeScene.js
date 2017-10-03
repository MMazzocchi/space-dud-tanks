var OrientationThreeScene = function(render_window) {
  var that = new ThreeScene(render_window);

  // Fields
  var camera = that.getCamera();
  var controls = new THREE.DeviceOrientationControls(camera);
  var mobile = false;

  that.on('render', function() {
    if(mobile === true) {
      controls.update();
    }
  });

  that.on('setup_for_mobile', function() {
    mobile = true;
  });

  return that;
};
