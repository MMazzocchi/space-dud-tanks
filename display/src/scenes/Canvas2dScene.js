var Scene = require('./Scene.js');

var Canvas2dScene = function(render_window) {
  var that = new Scene();

  // Fields
  var canvas = render_window.get2dCanvas();
  var context = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;
  var mobile = false;

  // Private methods
  function setup() {
    that.on('render', function() {
      context.save();
        context.clearRect(0, 0, width, height);
        if(mobile === false) {
          that.emit('draw', context, width, height);

        } else {
          that.emit('draw', context, width/2, height);
          context.translate(width/2, 0);
          that.emit('draw', context, width/2, height);
        }
      context.restore();
    });

    that.on('resize', function(new_width, new_height) {
      width = new_width;
      height = new_height;
    });

    that.on('setup_for_mobile', function() {
      mobile = true;
    });

    render_window.show2dCanvas();
  }

  setup();

  return that;
};

module.exports = Canvas2dScene;
