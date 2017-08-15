var FlightScene = function(game, ship, controller, width, height) {
  var that = new Scene(width, height);

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var camera_focus = undefined;
  var loader = new THREE.JSONLoader();
  var ship_model = ship.getModel();
  var player = new Player(ship, ship_model);

  // Private methods
  function setupShipModel() {
    ship_model.position.y += 1;
    ship_model.position.z += 350;
    ship_model.position.x += 350;

    ship_model.scale.x = 0.2;
    ship_model.scale.y = 0.2;
    ship_model.scale.z = 0.2;

    ship_model.rotation.y += Math.PI/2;

    var cockpit = ship.getCockpit();

    camera.position.x += cockpit.x;
    camera.position.y += cockpit.y;
    camera.position.z += cockpit.z;

    ship_model.add(camera);

    return ship_model; 
  };

  function setupController() {
    controller.resetEventMappings();

    controller.on('throttle', function(value) {
      player.setAcceleration(value);
    });

    controller.on('left', function(value) {
      player.setLeft(value);
    });

    controller.on('right', function(value) {
      player.setRight(value);
    });

    controller.on('up', function(value) {
      player.setUp(value);
    });

    controller.on('down', function(value) {
      player.setDown(value);
    });
  };

  function setup() {
    setupController();

    scene.background = new THREE.Color("skyblue");

    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var di_light = new THREE.DirectionalLight(0xCCCCCC, 0.8);
    scene.add(di_light);

    scene.add(setupShipModel());

    loader.load("/json/mountains.json",

      // On Load
      function(loaded_geometry, loaded_materials) {
        var mesh = new THREE.Mesh(loaded_geometry, loaded_materials);
        mesh.scale.x = 50;
        mesh.scale.y = 50;
        mesh.scale.z = 50;
        scene.add(mesh);
      },

      // On progress
      function() {},

      // On error
      function() {
        console.log("Error occured during load.");
      });
  };

  // Public functions
  that.renderStep = function() {
    player.step();
  };

  // After instantiation, call setup methods
  setup();
 
  return that;
};
