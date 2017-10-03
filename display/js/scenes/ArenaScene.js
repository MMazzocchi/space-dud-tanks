var ArenaScene = function(game, client, render_window) {
  var that = new OrientationThreeScene(render_window);

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var hud = new Hud();
  var tank_models = {};
  var shot_models = {};
  var player_id = client.getPlayerId();
  var last_update = new Date();
  var current_packet = undefined;

  var shot_geometry = new THREE.SphereGeometry(0.5, 12, 12);
  var shot_material = new THREE.MeshLambertMaterial({ color: 0x333333 });

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
    tank_models[data.player_id] = -1;
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
    tank_models[data.player_id] = model;
  };

  function updateTankModel(data) {
    var now = new Date();

    var model = tank_models[data.player_id];
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

  function createShotModel(data) {
    var point = new THREE.Object3D();

    point.position.x = data.x;
    point.position.y = data.y;
    point.position.z = data.z;

    var sphere = new THREE.Mesh(shot_geometry, shot_material);
    sphere.position.y = 7;
    point.add(sphere);

    shot_models[data.shot_id] = point;
    scene.add(point);
  };

  function updateShotModel(data) {
    var now = new Date();

    var model = shot_models[data.shot_id];
    var then = new Date(current_packet.time);

    model.position.x = interpolate(model.position.x, last_update,
                                   data.x, then, now);
    model.position.y = interpolate(model.position.y, last_update,
                                   data.y, then, now);
    model.position.z = interpolate(model.position.z, last_update,
                                   data.z, then, now);
  };

  function handleArenaState(data) {
    current_packet = data;

    var objects = current_packet.data.objects;
    var object_ids = Object.keys(objects);

    for(var i=0; i<object_ids.length; i++) {
      var id = object_ids[i];
      var object = objects[id];

      if(object.type === 'tank') {
        var tank = object;

        if(tank_models[tank.player_id] === undefined) {
          createTankModel(tank);
        }

      } else if(object.type === 'shot') {
        var shot = object;

        if(shot_models[shot.shot_id] === undefined) {
          createShotModel(shot);
        }
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

      that.on('render', function() {
        if(current_packet !== undefined) {
          var objects = current_packet.data.objects;
          var object_ids = Object.keys(objects);

          for(var i=0; i<object_ids.length; i++) {
            var id = object_ids[i];
            var object = objects[id];

            if(object.type === 'tank') {
              updateTankModel(object);

            } else if(object.type === 'shot') {
              updateShotModel(object);
            }
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
