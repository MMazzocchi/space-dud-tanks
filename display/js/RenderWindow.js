var RenderWindow = function(parent_element, width, height) {
  var that = {};

  // Fields
  var canvas_2d;
  var canvas_3d;

  // Private methods
  function createCanvas() {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    return canvas;
  };

  function setup() {
    canvas_2d = createCanvas();
    parent_element.appendChild(canvas_2d);

    canvas_3d = createCanvas();
    canvas_3d.style.display = "none";
    parent_element.appendChild(canvas_3d);
  };

  // Public methods
  that.get2dCanvas = function() {
    return canvas_2d;
  };

  that.get3dCanvas = function() {
    return canvas_3d;
  };

  that.show2dCanvas = function() {
    canvas_2d.style.display = "";
    canvas_3d.style.display = "none";
  };

  that.show3dCanvas = function() {
    canvas_2d.style.display = "none";
    canvas_3d.style.display = "";
  };

  that.resize = function(new_width, new_height) {
    canvas_2d.width = new_width;
    canvas_2d.height = new_height;

    canvas_3d.width = new_width;
    canvas_3d.height = new_height;
  };

  setup();

  return that;
};
