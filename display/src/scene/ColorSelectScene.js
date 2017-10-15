var LogScene = require('./LogScene.js');
var AnimatedScene = require('./AnimatedScene.js');

var ColorSelectScene = function(canvas, connection) {
  var that = AnimatedScene.mixin(new LogScene(connection));

  // Fields
  var ctx = canvas.getContext('2d');
  var count = 0;

  // Private methods
  function decToHex(dec) {
    if(dec <   10) { return dec; }
    if(dec === 10) { return "A"; }
    if(dec === 11) { return "B"; }
    if(dec === 12) { return "C"; }
    if(dec === 13) { return "D"; }
    if(dec === 14) { return "E"; }
    if(dec === 15) { return "F"; }
  };

  // Public methods
  that.draw = function() {
    var width = canvas.width;
    var height = canvas.height;

    var color = "#";
    var hex = decToHex(count);

    for(var i=0; i<6; i++) {
      color = color + hex;
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    count = (count + 1) % 16;
  };

  return that;
};

module.exports = ColorSelectScene;
