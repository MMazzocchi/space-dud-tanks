var SelectionScene = function(game, client) {
  var that = new Scene();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var model = undefined;
  var tank = undefined;
  var colorList = new ColorList();
  var index = 0;

  // Private functions
  function setTank(new_tank) {
    if(model !== undefined) {
      scene.remove(model);
    }

    model = new_tank.getModel();
    scene.add(model);

    tank = new_tank;
  };

  function setupScene() {
    camera.position.z += 12; 
    camera.position.y += 11;
    camera.rotation.x -= Math.PI / 4;

    // Create the platform
    var geom = new THREE.PlaneGeometry(20.0, 20.0, 5, 5);
    var mat = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
    mat.side = THREE.DoubleSide;

    var platform = new THREE.Mesh(geom, mat);
    platform.rotation.x -= Math.PI / 2;
    platform.rotation.z += Math.PI/4;
    scene.add(platform);

    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var spot_light = new THREE.SpotLight( 0xDDDDDD );
    spot_light.angle = Math.PI / 9;
    spot_light.penumbra = 0.5;
    spot_light.position.y += 30;
    scene.add(spot_light);
  };

/*
  function setupController() {
    // Set up controller events
    controller.on('left', function(value) {
      if(value === 1) {
        tank.setColor(colorList.getPreviousColor());
      }
    });

    controller.on('right', function(value) {
      if(value === 1) {
        tank.setColor(colorList.getNextColor());
      }
    });

    controller.on('start', function(value) {
      if(value === 1) {
        game.setScene(
          new LoadingScene(game,
            new ArenaScene(game, controller, tank)));
      }
    });
  };
*/

  function setupClient() {
    client.onEventType('tank_color', function(data) {
      if(tank !== undefined) {
        tank.setColor(data.color);
      }
    });
  };

  function setup() {
    new Tank().then(function(new_tank) {
      setTank(new_tank);
      setupClient();
    }).catch(function(e) {
      console.error("Tank could not be instantiated: "+e);
    });

    setupScene();
  };

  // Public functions
  that.renderStep = function() {
    if(model !== undefined) {
      model.rotation.y += 0.02;
    }
  };

  that.setupForMobile = function() {};

  // After instantiation, call setup methods
  setup();

  return that;
};
