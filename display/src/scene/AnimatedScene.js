var Scene = require('./Scene.js');

var AnimatedScene = function() {
  var that = new Scene();

  // Fields
  var run = false;

  // Private Methods
  function animationLoop() {
    if(run === true) {
      requestAnimationFrame(animationLoop);
    }

    that.draw();
  };

  that.on('setup', function() {
    run = true;
    requestAnimationFrame(animationLoop);
  });

  that.on('teardown', function() {
    run = false;
  });

  // Public Methods
  that.draw = function() {};
};

module.exports = AnimatedScene;
