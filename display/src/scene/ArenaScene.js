var TankGameBaseScene = require('./TankGameBaseScene.js');
var THREE = require('../../lib/three.min.js');
var JSONLoader = require('../loaders/JSONLoader.js');
var CubeTextureLoader = require('../loaders/CubeTextureLoader.js');
var TankModelLoader = require('../loaders/TankModelLoader.js');
var Hud = require('./Hud.js');

var ArenaScene = function(canvas_switcher, connection, vr) {
  var that = new TankGameBaseScene(canvas_switcher, connection, vr);

  // Fields
  var scene = that.getScene();
  var camera = that.getCamera();
  var renderer = that.getRenderer();

  var player_id = connection.getPlayerId();
  var tank_models = {};
  var hud = new Hud();

  // Private methods
  that.on('setup', async function() {
    await setupScene();
    connection.once('room_state', preStartHandleRoomState);
  });

  that.on('teardown', function() {
  });

  async function preStartHandleRoomState(state) {
    var tanks = state.state.tanks;
    for(var i=0; i<tanks.length; i++) {
      var tank = tanks[i];
      await processTankData(tank);

      if(tank.player_id === player_id) {
        var model = tank_models[player_id];
        setupPlayersTankModel(model);

        connection.on('room_state', handleRoomState);
        canvas_switcher.show3dCanvas();
      } else {
        connection.once('room_state', preStartHandleRoomState);
      }
    }
  };

  function setupPlayersTankModel(model) {
    model.children[0].visible = false;

    model.add(camera);
    camera.position.y += 7;
    camera.position.z -= 3.5;

    camera.rotation.y += Math.PI;

    var sprite = hud.getSprite();
    sprite.position.z -= 0.5;
    camera.add(sprite);
    hud.update();
  };

  async function handleRoomState(state) {
    var tanks = state.state.tanks;
    for(var i=0; i<tanks.length; i++) {
      var tank = tanks[i];
      await processTankData(tank);
    }
  };

  async function processTankData(tank) {
    if(tank_models[tank.player_id] === undefined) {
      var model = await TankModelLoader.load();
      model.material[2].color = new THREE.Color(tank.color);

      scene.add(model);
      tank_models[tank.player_id] = model;
    }

    if(tank.player_id === player_id) {
      if(tank.cooldown <= 0) {
        hud.setReadyToFire(true);
      } else {
        hud.setReadyToFire(false);
      }
    }

    model = tank_models[tank.player_id];

    model.position.x = tank.x; 
    model.position.y = tank.y; 
    model.position.z = tank.z; 

    model.rotation.y = tank.theta;
  };

  async function setupScene() {
    var arena = await JSONLoader.load('/json/arena.json');
    scene.add(arena);

    var texture = await CubeTextureLoader.load(
      '/cube_textures/ame_iceflats/');
    scene.background = texture;

    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var dir_light = new THREE.DirectionalLight( 0xf9dfae, 0.5 );
    dir_light.position.x = 0.5;
    dir_light.position.z = 0.5;
    scene.add(dir_light);
  };

  // Public methods
  that.draw = function() {
    renderer.render(scene, camera);
  };

  return that;
};

module.exports = ArenaScene;
