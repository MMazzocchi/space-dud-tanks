var ArenaScene = function(game, client) {
  var that = new Scene();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var hud = new Hud();
  var tank_data = {};
  var player_id = client.getPlayerId();
  var last_update = new Date();
  var current_packet = undefined;

  var interpolate = Util.interpolate;

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

  function updateTankModel(id) {
    var now = new Date();

    var model = tank_data[id];
    var data = current_packet.tanks[id];
    var then = new Date(current_packet.time);

    if(model !== -1) {
//      model.position.x = interpolate(model.position.x, now, data.x, then);
//      model.position.y = interpolate(model.position.y, now, data.y, then);
//      model.position.z = interpolate(model.position.z, now, data.z, then);
//      model.rotation.y = interpolate(model.rotation.y, now,
//                                     data.theta, then);

      model.rotation.y = interpolate(model.rotation.y, last_update,
                                     data.theta, then,
                                     now);

      if(id === player_id) {
        hud.setHealth(data.health);
        hud.setReadyToFire(data.cooldown <= 0);

        hud.update();
      }
    }
  };

  function handleArenaState(data) {
    current_packet = data.data;

    var tanks = current_packet.tanks;
    var ids = Object.keys(tanks);

    for(var i=0; i<ids.length; i++) {
      var id = ids[i];

      if(tank_data[id] === undefined) {
        createTankModel(id, tanks[id]);
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
    if(current_packet !== undefined) {
      var ids = Object.keys(current_packet.tanks);

      for(var i=0; i<ids.length; i++) {
        var id = ids[i];
        updateTankModel(id);
      }
    }

    last_update = new Date();
  };

  setup();

  return that;
};
