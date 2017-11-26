var Scene = require('./Scene.js');
var AnimatedScene = require('./AnimatedScene.js');
var THREE = require('../../lib/three.min.js');

var TankGameBaseScene = function(canvas_switcher, connection) {
  var that = AnimatedScene.mixin(new Scene());

  // Fields
  var canvas = canvas_switcher.get3dCanvas();
  var width = canvas.width;
  var height = canvas.height;

  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas });

  // Private methods
  function showLoading() {
    var canvas_2d = canvas_switcher.get2dCanvas();
    var ctx = canvas_2d.getContext('2d');

    ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "200 24px monospace";
      ctx.fillStyle = "#EEEEEE";
      ctx.textAlign = "center";

      ctx.translate(width/2, height/2);
      ctx.fillText("Loading...", 0, 0);
    ctx.restore();

    canvas_switcher.show2dCanvas();
  };

  function setup() {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    that.on('setup', showLoading);
  }

  // Public methods
  that.getScene = function() { return scene; };
  that.getCamera = function() { return camera; };
  that.getRenderer = function() { return renderer };

  setup();

  return that;
};

module.exports = TankGameBaseScene;
