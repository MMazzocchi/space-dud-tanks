var Canvas2dScene = require('./Canvas2dScene.js');

var ControllerSetupScene = function(game, client, render_window) {
  var that = new Canvas2dScene(render_window);
 
  // Fields
  var lines = [];

  // Private functions
  function addEvent(data) {
    var ok_extra    = " ........................................ OK";
    var space_extra = "                                            ";

    if(lines.length > 0) {
      var last_line = lines[lines.length - 1];
      var name = last_line.substr(0, last_line.indexOf(' '));

      ok_extra = ok_extra.substr(name.length + 1);
      lines[lines.length - 1] = name + ' '+ ok_extra;
    }

    space_extra = space_extra.substr(data.type.length);
    lines.push(data.type + space_extra);
  };

  function setup() {
    client.onEventType('need_controller_event', addEvent);
  
    that.onDraw(function(ctx, width, height) {
      ctx.save();

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
 
        ctx.save();
          ctx.textAlign = 'center';
          ctx.translate(width / 2, height / 2);

          var box_width = width * 0.5;
          var box_height = height * 0.5;

          ctx.fillStyle = '#00FF00';
          ctx.textBaseline = 'top';
          ctx.font = "600 12px monospace";

          ctx.strokeStyle = '#00FF00';
          ctx.lineWidth = 4;
          ctx.strokeRect(-box_width/2, -box_height/2, box_width, box_height);

          ctx.translate(0, -box_height/2 + 10);
 
          ctx.fillText("Controller Setup", 0, 0);
          ctx.fillText("Press button to assign to:", 0, 20);

          var y = 50;
          for(var i=0; i<lines.length; i++) {
            ctx.fillText(lines[i], 0, y);
            y += 20;
          }

        ctx.restore();
      ctx.restore();
    });
  };

  setup();

  return that;
};

module.exports = ControllerSetupScene;
