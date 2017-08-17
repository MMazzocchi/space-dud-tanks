var ControllerSetupScene = function(game, client) {
  var that = new Scene();

  // Fields
  var controller = new Controller(client);
  var camera = that.getCamera();
  var scene = that.getScene();
  var sprite = new ControllerSetupSprite();

  // Private functions
  function setupScene() {
    camera.position.z += 1.2;
    scene.add(sprite.getSprite());
    sprite.update();
  };

  function assignControls() {

    var event_types = controller.getEventTypes();
    var i = -1;

    function callback() {
      i += 1;
      if(i != event_types.length) {
        sprite.addEvent(event_types[i]);
        controller.setNextEvent(event_types[i], callback);
      } else {
        sprite.addEvent("");
        controller.activate(); 

        game.setScene(new SelectionScene(game, controller));
      }
    };

    callback();
  };

  // Public functions
  that.setupForMobile = function() {};

  setupScene();
  assignControls();

  return that;
};
