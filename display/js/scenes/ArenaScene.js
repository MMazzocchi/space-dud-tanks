var ArenaScene = function(game, client) {
  var that = new Scene();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var hud = new Hud();

  // Private functions
  function setupScene() {
    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var dir_light = new THREE.DirectionalLight( 0xf9dfae, 0.5 );
    dir_light.position.x = 0.5;
    dir_light.position.y = 0.5;
    dir_light.position.z = 0.5;
    scene.add(dir_light);

//    tank_model.add(camera);
    camera.position.y += 7;
    camera.position.z -= 3.5;
    camera.rotation.y += Math.PI;

    var sprite = hud.getSprite();
    sprite.position.z -= 0.5;
    camera.add(sprite);
  };

  async function setup() {
    try {
      var arena = await JSONLoader.load('/json/arena.json');
      scene.add(arena);

      var texture = 
        await CubeTextureLoader.load('/cube_textures/ame_iceflats/');
      scene.background = texture;

//      tank_model = await TankModelLoader.load();
//      tank_model.children[0].visible = false;
//
//      scene.add(tank_model);

      setupScene();
    } catch(e) {
      console.error("Could not setup: "+e);
    }
  };

  // Public functions
  that.renderStep = function() {
//    tank.step();
//
//    for(var i=shots.length-1; i >= 0; i--) {
//      shots[i].step();
//
//      if(shots[i].isDone() === true) {
//        scene.remove(shots[i].getModel());
//        shots.splice(i, 1);
//      }
//    }
//
//    var new_shots = tank.getNewShots();
//    for(var i=0; i<new_shots.length; i++) {
//      scene.add(new_shots[i].getModel());
//    }
//
//    shots = shots.concat(new_shots);
  };

  setup();

  return that;
};
