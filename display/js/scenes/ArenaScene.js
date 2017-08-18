var ArenaScene = function(game, controller, tank) {
  var that = new SceneWithLoading();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var hud = new Hud(tank);
  var tank_model = tank.resetModel();
  var arena = undefined;

  // Private functions
  function setupScene() {
    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var dir_light = new THREE.DirectionalLight( 0xf9dfae, 0.5 );
    dir_light.position.x = 0.5;
    dir_light.position.y = 0.5;
    dir_light.position.z = 0.5;
    scene.add(dir_light);

    tank.setBarrelVisible(false);
    tank_model.add(camera);
    camera.position.y += 7;
    camera.position.z -= 3.5;

    var sprite = hud.getSprite();
    sprite.position.z -= 0.5;
    camera.add(sprite);

    scene.add(tank_model);
  };

  function setupController() {
    controller.resetEventMappings();
    controller.on('throttle', tank.throttle);
    controller.on('right', tank.right);
    controller.on('left', tank.left);
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
      setupController();

      that.setProgress(100);

    }).catch(function(e) {
      console.error("Could not setup: "+e);
    });
  };

  // Public functions
  that.renderStep = function() {
    tank.step();
    hud.step();
  };

  setup();

  return that;
};
