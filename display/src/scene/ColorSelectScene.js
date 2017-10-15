var Scene = require('./Scene.js');
var AnimatedScene = require('./AnimatedScene.js');
var THREE = require('../../lib/three.min.js');

var ColorSelectScene = function(canvas_switcher, connection) {
  var that = AnimatedScene.mixin(new Scene());
  var canvas = canvas_switcher.get3dCanvas();

  // Fields
  var width = canvas.width;
  var height = canvas.height;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas });
  
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

  function setup() {
    width = canvas.width;
    height = canvas.height;

    renderer.setSize(width, height);

    camera.aspect = width/height;
    camera.updateProjectionMatrix();

    camera.position.z += 12; 
    camera.position.y += 11;
    camera.rotation.x -= Math.PI / 4;

    setupPlatform();
    setupLighting();
  };

  that.on('setup', function() {
    canvas_switcher.show3dCanvas();
  });

  // Public methods
  that.draw = function() {
    renderer.render(scene, camera);
  };

  setup();

  return that;
};

module.exports = ColorSelectScene;
