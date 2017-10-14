var Scene = require('./Scene.js');

var ControllerSetupScene = function(canvas, connection) {
  var that = new Scene();
  var ctx = canvas.getContext('2d');

  var lines = [
    "Controller Setup",
    "Press button to assign to:"
  ];

  // Private functions
  function draw() {
    var width = canvas.width;
    var height = canvas.height;

    ctx.save();
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#11FF11';
      ctx.font = '600 12px monospace';
      ctx.textAlign = 'center';

      ctx.translate(width / 2, 0);

      var x = 0;
      var y = 20;

      for(var i=0; i<lines.length; i++) {
        ctx.fillText(lines[i], x, y);
        y += 20;
      }

    ctx.restore();
  };

  function handleEventRequest(data) {
    lines.push(data.type);
    draw();
  };

  that.on('setup', function() {
    connection.onEventType('need_controller_event', handleEventRequest);
  });

  that.on('teardown', function() {
    connection.offEventType('need_controller_event', handleEventRequest);
  });

  draw();

  return that;
};

module.exports = ControllerSetupScene;
