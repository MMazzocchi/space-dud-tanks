var SelectionScene = function(game, client) {
  var that = new Scene();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var model = undefined;
  var index = 0;

  // Private functions
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

  function setupClient() {
    client.onEventType('tank_color', function(data) {
      model.material[2].color = new THREE.Color(color);
    });
  };

  function setupRenderStep() {
    that.renderStep = function() {
      model.rotation.y += 0.02;
    };
  };

  function setup() {
    TankModelLoader.load().then(function(tank_model) {
      model = tank_model;
      scene.add(tank_model);

      setupClient();
      setupRenderStep();
    }).catch(function(e) {
      console.error("Tank could not be instantiated: "+e);
    });

    setupScene();
  };

  // Public functions
  that.setupForMobile = function() {};

  // After instantiation, call setup methods
  setup();

  return that;
};
