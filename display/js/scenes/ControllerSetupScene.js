var ControllerSetupScene = function(game, client) {
  var that = new Scene();

  // Fields
  var controller = new Controller(client);
  var camera = that.getCamera();
  var scene = that.getScene();
  var sprite = new ControllerSetupSprite();

  // Private functions
  function setup() {
    client.onEventType('need_controller_event', function(data) {
      sprite.addEvent(data.type);
    });

    setupScene();
  };

  function setupScene() {
    camera.position.z += 1.2;
    scene.add(sprite.getSprite());
    sprite.update();
  };

  // Public functions
  that.setupForMobile = function() {};

  setup();

  return that;
};
