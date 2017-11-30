var CanvasSwitcher = function(parent_component) {
  var that = {};

  // Fields
  var canvas_2d = document.createElement('canvas');
  var canvas_3d = document.createElement('canvas');

  // Private methods
  function setup() {
    canvas_2d.style.display = "none";
    parent_component.appendChild(canvas_2d);

    canvas_3d.style.display = "none";
    parent_component.appendChild(canvas_3d);

    window.addEventListener('resize', resize);
    resize();
  };

  function resize() {
    canvas_2d.width = window.innerWidth;
    canvas_2d.height = window.innerHeight;

    canvas_3d.width = window.innerWidth;
    canvas_3d.height = window.innerHeight;
  };

  // Public methods
  that.get2dCanvas = function() { return canvas_2d; };
  that.get3dCanvas = function() { return canvas_3d; };

  that.show2dCanvas = function() {
    canvas_3d.style.display = "none";
    canvas_2d.style.display = "";
  };

  that.show3dCanvas = function() {
    canvas_2d.style.display = "none";
    canvas_3d.style.display = "";
  };

  setup();

  return that;
};

module.exports = CanvasSwitcher;
