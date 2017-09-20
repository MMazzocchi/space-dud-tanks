var Game = function(parent_element, current_width, current_height, client) {
  var that = {};

  // Fields
  var width = current_width;
  var height = current_height;
  var mobile = false;

  var render_window = new RenderWindow(parent_element, width, height);
  render_window.show3dCanvas();

  var scene = new Scene();
  scene.resize(width, height);

  var renderer = new THREE.WebGLRenderer({ canvas: render_window.get3dCanvas() });
  renderer.setSize(width, height);

  var storyboard = new Storyboard(client, that);
  storyboard.registerScene("controller_setup", ControllerSetupScene);
  storyboard.registerScene("tank_select", TankSelectScene);
  storyboard.registerScene("arena", ArenaScene);

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
  that.setSize = function(new_width, new_height) {
    width = new_width;
    height = new_height;

    render_window.resize(width, height);
    renderer.setSize(width, height);
    scene.resize(width, height);
  };

  that.getRenderer = function() { return renderer; };

  that.setScene = function(new_scene) {
    scene = new_scene;
    scene.resize(width, height);

    if(mobile === true) {
      scene.setupForMobile();
    }
  };

  // After instantiaton, set up game
  setup();

  return that;
};
