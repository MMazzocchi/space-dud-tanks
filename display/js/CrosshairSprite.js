var CrosshairSprite = function() {
  var that = {};

  // Fields
  var canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  var ctx = canvas.getContext('2d');
  var map = new THREE.Texture(canvas);
  var mat = new THREE.SpriteMaterial({ 'map': map });

  // Public methods
  that.draw = function() {
    ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.translate(canvas.width / 2, canvas.height / 2);

      ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(20, 0);

        ctx.moveTo(0, -20);
        ctx.lineTo(0, 20);

        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 10, 0, 2*Math.PI);

      ctx.stroke();
    ctx.restore();

    map.needsUpdate = true;
  };

  that.getSprite = function() { 
    var sprite = new THREE.Sprite(mat);  
    sprite.scale.set(1, canvas.height / canvas.width);
    map.needsUpdate = true;
    return sprite;
  };

  that.draw();

  return that;
};
