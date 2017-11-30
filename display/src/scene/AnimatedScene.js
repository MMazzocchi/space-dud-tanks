var AnimatedScene = function() {
  var that = {};

  that.mixin = function(scene) {

    // Fields
    var run = false;

    // Private Methods
    function animationLoop() {
      if(run === true) {
        requestAnimationFrame(animationLoop);
      }

      scene.draw();
    };

    scene.on('setup', function() {
      run = true;
      requestAnimationFrame(animationLoop);
    });

    scene.on('teardown', function() {
      run = false;
    });

    // Public Methods
    scene.draw = function() {};

    return scene;
  };

  return that;
}();

module.exports = AnimatedScene;
