var LoadingSprite = function() {

  // Static fields
  var canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;

  var map = new THREE.Texture(canvas);
  var mat = new THREE.SpriteMaterial({ 'map': map });
  
  var ctx = canvas.getContext('2d');
  ctx.font = "600 20px monospace";
 
  var LoadingSpriteDef = function() {
    var that = {};
 
    // Public methods
    that.update = function(progress) {
      ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
        ctx.fillStyle = '#00FF00';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.translate(canvas.width / 2, 10);
        ctx.fillText("Loading", 0, 0);

        ctx.translate(0, 40);
        ctx.strokeRect(-100, 0, 200, 40);

        ctx.fillRect(-90, 10, 180*(progress/100), 20);
      ctx.restore();
  
      map.needsUpdate = true;
    };
  
    that.getSprite = function() { 
      var sprite = new THREE.Sprite(mat);  

      sprite.scale.set(1, canvas.height / canvas.width);
      map.needsUpdate = true;

      return sprite;
    };

    // Initial update 
    that.update(0);
 
    return that;
  };

  return LoadingSpriteDef;
}();
