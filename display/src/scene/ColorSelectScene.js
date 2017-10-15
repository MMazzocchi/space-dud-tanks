var Scene = require('./Scene.js');
var AnimatedScene = require('./AnimatedScene.js');
var THREE = require('../../lib/three.min.js');
var TankModelLoader = require('../loaders/TankModelLoader.js');

var ColorSelectScene = function(canvas_switcher, connection) {
  var that = AnimatedScene.mixin(new Scene());

  // Fields
  var canvas = canvas_switcher.get3dCanvas();
  var width = canvas.width;
  var height = canvas.height;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas });

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

  function changeColor(data) { 
    if(model !== undefined) {
      model.material[2].color = new THREE.Color(data.color);
    }
  };

  function setup() {
    width = canvas.width;
    height = canvas.height;

    renderer.setSize(width, height);

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    camera.position.z += 12; 
    camera.position.y += 11;
    camera.rotation.x -= Math.PI / 4;

    TankModelLoader.load().then(function(tank_model) {
      setupPlatform();
      setupLighting();

      model = tank_model;
      scene.add(model);

    }).catch(function(e) {
      consle.error(e);
    });
  };

  that.on('setup', function() {
    connection.onEventType('tank_color', changeColor);
    canvas_switcher.show3dCanvas();
  });

  that.on('setup', function() {
    connection.offEventType('tank_color', changeColor);
  });

  // Public methods
  that.draw = function() {
    if(model !== undefined) {
      model.rotation.y += 0.02;
    }

    renderer.render(scene, camera);
  };

  setup();

  return that;
};

module.exports = ColorSelectScene;
