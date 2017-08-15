var Game = function(width, height, client) {
  var that = {};

  // Fields
  var scene = new ControllerSetupScene(that, client, width, height);
  var mobile = false;
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  // Private functions
  function setupForMobile() {
    renderer.setPixelRatio(window.devicePixelRatio);

    var effect = new THREE.StereoEffect(renderer);
    effect.setSize(width, height);
    renderer = effect;

    scene.setupForMobile();
  };

  function render() {
    scene.render(renderer);
    window.requestAnimationFrame(render);
  }

  function setup() {
    window.addEventListener('deviceorientation', function(e) {
      if(mobile === false) {
        mobile = true;
        setupForMobile();
      }
    }, false );

    render();
  };

  // Public functions
  that.setSize = function(width, height) {
    renderer.setSize(width, height);
    scene.resize(width, height);
  };

  that.getRenderer = function() { return renderer; };

  that.setScene = function(new_scene) {
    scene = new_scene;
    if(mobile === true) {
      scene.setupForMobile();
    }
  };

  // After instantiaton, set up game
  setup();

  return that;
};
