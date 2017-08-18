var Hud = function(tank) {
  var that = {};

  // Fields
  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  var ctx = canvas.getContext('2d');
  var map = new THREE.Texture(canvas);
  var mat = new THREE.SpriteMaterial({ 'map': map });

  // Private methods
  function drawHealth() {
    var health = tank.getHealth();
    var start_theta = -(Math.PI / 2);
    var d_theta = (2 * Math.PI) / 10;
    var gap_theta = Math.PI / 50;

    ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#00FF00';
      ctx.globalAlpha = 0.5;

      for(var i=0; i<health; i++) {
         var theta1 = start_theta + gap_theta;
         var theta2 = start_theta + d_theta - gap_theta;

         ctx.beginPath();
           ctx.arc(0, 0, 35, theta1, theta2);
         ctx.stroke();

         start_theta += d_theta;
      }
    ctx.restore();
  };

  function drawCrosshair() {
    ctx.save();
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.5;
      ctx.translate(canvas.width / 2, canvas.height / 2);

      ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(20, 0);

        ctx.moveTo(0, -20);
        ctx.lineTo(0, 20);

        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 20, 0, 2*Math.PI);

      ctx.stroke();
    ctx.restore();
  };

  function draw() {
    ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawCrosshair();
      drawHealth();
    ctx.restore();

    map.needsUpdate = true;
  };

  // Public methods
  that.step = function() {
    // TODO: Update on health
  };

  that.getSprite = function() { 
    var sprite = new THREE.Sprite(mat);  
    sprite.scale.set(1, canvas.height / canvas.width);
    map.needsUpdate = true;
    return sprite;
  };

  draw();

  return that;

};