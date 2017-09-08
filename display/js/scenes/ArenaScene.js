var ArenaScene = function(game, client) {
  var that = new Scene();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var hud = new Hud();
  var tank_data = {};
  var player_id = client.getPlayerId();

  // Private functions
  function setupScene() {
    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var dir_light = new THREE.DirectionalLight( 0xf9dfae, 0.5 );
    dir_light.position.x = 0.5;
    dir_light.position.y = 0.5;
    dir_light.position.z = 0.5;
    scene.add(dir_light);

    var sprite = hud.getSprite();
    sprite.position.z -= 0.5;
    camera.add(sprite);
  };

  async function createTankModel(id, data) {
    tank_data[id] = -1;
    var model = await TankModelLoader.load();

    model.position.x = data.x;
    model.position.y = data.y;
    model.position.z = data.z;

    model.rotation.y = data.theta;

    model.material[2].color = new THREE.Color(data.color);

    if(id === player_id) {
      model.children[0].visible = false;

      model.add(camera);
      camera.position.y += 7;
      camera.position.z -= 3.5;

      camera.rotation.y += Math.PI + model.rotation.y;
    }

    scene.add(model);
    tank_data[id] = model;
  };

  function updateTankModel(id, data) {
    var model = tank_data[id];

    if(model !== -1) {
      model.position.x = data.x;
      model.position.y = data.y;
      model.position.z = data.z;

      model.rotation.y = data.theta;

      if(id === player_id) {
        hud.setHealth(data.health);
        hud.setReadyToFire(data.cooldown <= 0);
        hud.update();
      }
    }
  };

  function handleArenaState(data) {
    var tank_state = data.data;
    var ids = Object.keys(tank_state);

    for(var i=0; i<ids.length; i++) {
      var id = ids[i];

      if(tank_data[id] === undefined) {
        createTankModel(id, tank_state[id]);

      } else {
        updateTankModel(id, tank_state[id]);
      }
    }
  };

  async function setup() {
    try {
      var arena = await JSONLoader.load('/json/arena.json');
      scene.add(arena);

      var texture = 
        await CubeTextureLoader.load('/cube_textures/ame_iceflats/');
      scene.background = texture;

      setupScene();

      client.onEventType('arena_state', handleArenaState);
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
