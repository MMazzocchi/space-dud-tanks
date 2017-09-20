var ArenaScene = function(game, client, render_window) {
  var that = new OrientationThreeScene(render_window);

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var hud = new Hud();
  var model_data = {};
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

  async function createTankModel(data) {
    model_data[data.player_id] = -1;
    var model = await TankModelLoader.load();

    model.position.x = data.x;
    model.position.y = data.y;
    model.position.z = data.z;

    model.rotation.y = data.theta;

    model.material[2].color = new THREE.Color(data.color);

    if(data.player_id === player_id) {
      model.children[0].visible = false;

      model.add(camera);
      camera.position.y += 7;
      camera.position.z -= 3.5;

      camera.rotation.y += Math.PI;
    }

    scene.add(model);
    model_data[data.player_id] = model;
  };

  function updateTankModel(data) {
    var now = new Date();

    var model = model_data[data.player_id];
    var then = new Date(current_packet.time);

    if(model !== -1) {
      model.position.x = interpolate(model.position.x, last_update,
                                     data.x, then, now);
      model.position.y = interpolate(model.position.y, last_update,
                                     data.y, then, now);
      model.position.z = interpolate(model.position.z, last_update,
                                     data.z, then, now);
      model.rotation.y = interpolate(model.rotation.y, last_update,
                                     data.theta, then, now);

      if(data.player_id === player_id) {
        hud.setHealth(data.health);
        hud.setReadyToFire(data.cooldown <= 0);

        hud.update();
      }
    }
  };

  function handleArenaState(data) {
    current_packet = data;

    var tanks = current_packet.data.objects;

    for(var i=0; i<tanks.length; i++) {
      var tank = tanks[i];

      if(model_data[tank.player_id] === undefined) {
        createTankModel(tanks[i]);
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

      client.onEventType('room_state', handleArenaState);

      that.onRender(function() {
        if(current_packet !== undefined) {
          var tanks = current_packet.data.objects;

          for(var i=0; i<tanks.length; i++) {
            updateTankModel(tanks[i]);
          }
        }

        last_update = new Date();
      });

    } catch(e) {
      console.error("Could not setup: "+e);
    }
  };

  setup();

  return that;
};
