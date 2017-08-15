var ControllerSetupSprite = function() {
  var that = {};

  // Fields
  var canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  var ctx = canvas.getContext('2d');
  ctx.font = "600 12px monospace";

  var map = new THREE.Texture(canvas);
  var mat = new THREE.SpriteMaterial({ 'map': map });

  var lines = [];

  // Private methods

  // Public methods
  that.addEvent = function(event_type) {
    if(lines.length > 0) {
      var last_line = lines[lines.length - 1];
      var extra = "............................. OK";
      extra = extra.substr(last_line.length);
      lines[lines.length - 1] += " " + extra;
    }

    lines.push(event_type);
    that.update();
  };

  that.update = function() {
    ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF00';
      ctx.textBaseline = 'top';

      ctx.save();
        ctx.textAlign = 'center';
        ctx.translate(canvas.width / 2, 10);
        ctx.fillText("Controller Setup", 0, 0);
        ctx.fillText("Press button to assign to:", 0, 20);
      ctx.restore();
 
      var y = 50;
      for(var i=0; i<lines.length; i++) {
        ctx.fillText(lines[i], 10, y);
        y += 20;
      }
    ctx.restore();

    map.needsUpdate = true;
  };

  that.getSprite = function() { 
    var sprite = new THREE.Sprite(mat);  
    var scale = 1.0;
    sprite.scale.set(scale*1, scale*canvas.height / canvas.width);
    map.needsUpdate = true;
    return sprite;
  };

  return that;
};
