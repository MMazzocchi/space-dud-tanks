var ArenaScene = function(game, controller, tank) {
  var that = new SceneWithLoading();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var tank_model = tank.resetModel();
  var arena = undefined;

  // Private functions
  function setupScene() {
    camera.position.y += 10;

    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var dir_light = new THREE.DirectionalLight( 0xf9dfae, 0.5 );
    dir_light.position.x = 0.5;
    dir_light.position.y = 0.5;
    dir_light.position.z = 0.5;
    scene.add(dir_light);

    scene.add(tank_model);
  };

  function setup() {
    JSONLoader.load('/json/arena.json').then(function(model) {
      scene.add(model);
      arena = model;

      that.setProgress(50);

      return CubeTextureLoader.load('/cube_textures/ame_iceflats/');

    }).then(function(texture) {
      scene.background = texture;

      setupScene();

      that.setProgress(100);

    }).catch(function(e) {
      console.error("Could not setup: "+e);
    });
  };

  // Public functions
  that.renderStep = function() {};

  setup();

  return that;
};
