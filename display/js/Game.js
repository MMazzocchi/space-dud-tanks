var Game = function(parent_element, current_width, current_height, client) {
  var that = {};

  // Fields
  var width = current_width;
  var height = current_height;
  var mobile = false;
  var render_window = new RenderWindow(parent_element, width, height);
  var storyboard = new Storyboard(client, that, render_window);

  var scene = new Scene();
  scene.triggerResize(width, height);

  // Private functions
  function render() {
    scene.triggerRender();
    window.requestAnimationFrame(render);
  }

  function setup() {
    storyboard.registerScene("controller_setup", ControllerSetupScene);
    storyboard.registerScene("tank_select", TankSelectScene);
    storyboard.registerScene("arena", ArenaScene);

    window.addEventListener('deviceorientation', function(e) {
      if(mobile === false) {
        mobile = true;
        scene.triggerSetupForMobile();
      }
    }, false );

    render();
  };

  // Public functions
  that.setSize = function(new_width, new_height) {
    width = new_width;
    height = new_height;

    render_window.resize(width, height);
    scene.triggerResize(width, height);
  };

  that.setScene = function(new_scene) {
    scene = new_scene;
    scene.triggerResize(width, height);

    if(mobile === true) {
      scene.triggerSetupForMobile();
    }
  };

  // After instantiaton, set up game
  setup();

  return that;
};
