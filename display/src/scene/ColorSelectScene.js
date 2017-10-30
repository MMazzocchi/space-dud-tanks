var TankGameBaseScene = require('./TankGameBaseScene.js');
var TankModelLoader = require('../loaders/TankModelLoader.js');

var ColorSelectScene = function(canvas_switcher, connection) {
  var that = new TankGameBaseScene(canvas_switcher, connection);

  // Fields
  var scene = that.getScene();
  var camera = that.getCamera();
  var renderer = that.getRenderer();

  var model = undefined;

  // Private methods
  function setupLighting() {
    var am_light = new THREE.AmbientLight( 0x707070 );
    scene.add(am_light);

    var spot_light = new THREE.SpotLight( 0xDDDDDD );
    spot_light.angle = Math.PI / 9;
    spot_light.penumbra = 0.5;
    spot_light.position.y += 30;
    scene.add(spot_light);
  };

  function setupPlatform() {
    var geom = new THREE.PlaneGeometry(20.0, 20.0, 5, 5);
    var mat = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
    mat.side = THREE.DoubleSide;

    var platform = new THREE.Mesh(geom, mat);
    platform.rotation.x -= Math.PI / 2;
    platform.rotation.z += Math.PI/4;
    scene.add(platform);
  };

  function setupCamera() {
    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    camera.position.z += 12; 
    camera.position.y += 11;
    camera.rotation.x -= Math.PI / 4;
  };

  function changeColor(data) { 
    if(model !== undefined) {
      model.material[2].color = new THREE.Color(data.color);
    }
  };

  that.on('setup', function() {
    TankModelLoader.load().then(function(tank_model) {
      renderer.setSize(width, height);

      setupPlatform();
      setupLighting();
      setupCamera();

      model = tank_model;
      scene.add(model);

      connection.on('tank_color', changeColor);
      canvas_switcher.show3dCanvas();

    }).catch(function(e) {
      console.error(e);
    });
  });

  that.on('teardown', function() {
    connection.offEventType('tank_color', changeColor);
  });

  // Public methods
  that.draw = function() {
    if(model !== undefined) {
      model.rotation.y += 0.02;
    }

    renderer.render(scene, camera);
  };

  return that;
};

module.exports = ColorSelectScene;
