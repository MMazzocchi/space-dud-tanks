var Scene = require('./Scene.js');
var AnimatedScene = require('./AnimatedScene.js');
var THREE = require('../../lib/three.min.js');
require('../../lib/StereoEffect.js');
require('../../lib/DeviceOrientationControls.js');

var TankGameBaseScene = function(canvas_switcher, connection, vr) {
  var that = AnimatedScene.mixin(new Scene());

  // Fields
  var canvas = canvas_switcher.get3dCanvas();
  var width = canvas.width;
  var height = canvas.height;

  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 10000);
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  var mobile_renderer = new THREE.StereoEffect(renderer);

  var controls = new THREE.DeviceOrientationControls(camera);

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
    that.on('setup', showLoading);
    resize();
  };

  function resize() {
    width = canvas.width;
    height = canvas.height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    if(vr === true) {
      mobile_renderer.setSize(width, height);
    }

    var ratio = 1;
    if(window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    }

    renderer.setViewport(0, 0, width*ratio, height*ratio);
  };

  that.on('setup', function() {
    window.addEventListener('resize', resize);
  });

  that.on('teardown', function() {
    window.removeEventListener('resize', resize);
  });

  // Public methods
  that.getScene = function() { return scene; };
  that.getCamera = function() { return camera; };

  that.getRenderer = function() {
    if(vr === true) {
      return mobile_renderer;
    } else {
      return renderer;
    }
  };

  that.getControls = function() { return controls; };

  setup();

  return that;
};

module.exports = TankGameBaseScene;
