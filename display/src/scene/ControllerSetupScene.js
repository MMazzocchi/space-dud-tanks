var Scene = require('./Scene.js');

var ControllerSetupScene = function(canvas_switcher, connection) {
  var that = new Scene();
  var canvas = canvas_switcher.get2dCanvas();

  // Fields
  const OK_LINE = "............................. OK";
  var ctx = canvas.getContext('2d');
  var lines = [
    "CONTROLLER SETUP",
    "",
    "Press any button to assign to:"
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
      ctx.font = '200 24px monospace';
      ctx.textAlign = 'left';

      var x = 20;
      var y = 40;

      for(var i=0; i<lines.length; i++) {
        ctx.fillText(lines[i], x, y);
        y += 40;
      }

    ctx.restore();
  };

  function handleEventRequest(data) {
    var new_line = data.type;

    if(lines.length > 3) {
      var last_index = lines.length - 1;
      var last_line = lines[last_index];

      lines[last_index] += " " + OK_LINE.substr(last_line.length);
    }

    lines.push(new_line);
    draw();
  };

  that.on('setup', function() {
    connection.on('need_controller_event', handleEventRequest);
    canvas_switcher.show2dCanvas();
    draw();
  });

  that.on('teardown', function() {
    connection.offEventType('need_controller_event', handleEventRequest);
  });

  return that;
};

module.exports = ControllerSetupScene;
