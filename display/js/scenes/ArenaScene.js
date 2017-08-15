var ArenaScene = function(game, controller, tank, width, height) {
  var that = new Scene(width, height);

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var tank = tank.resetModel();
  var arena = undefined;

  // Private functions
  function setupScene() {
    camera.position.y += 10;

    var am_light = new THREE.AmbientLight( 0xF0F0F0 );
    scene.add(am_light);
  };

  function setup() {
    JSONLoader.load('/json/arena.json').then(function(model) {
      scene.add(model);
      arena = model;
      setupScene();
    }).catch(function(e) {
      console.error("Could not load arena: "+e);
    });
  };

  // Public functions
  that.renderStep = function() {
    if(arena !== undefined) {
      arena.rotation.y += 0.01;
    }
  };

  setup();

  return that;
};
