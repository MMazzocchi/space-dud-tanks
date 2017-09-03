var Hud = function(tank) {
  var that = {};

  // Fields
  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const CH_WIDTH = 10;

  var ctx = canvas.getContext('2d');
  var map = new THREE.Texture(canvas);
  var mat = new THREE.SpriteMaterial({ 'map': map });

  var ready_to_fire = tank.readyToFire();
  var health = tank.getHealth();

  // Private methods
  function drawHealth() {
    var start_theta = -(Math.PI / 2);
    var d_theta = (2 * Math.PI) / 10;
    var gap_theta = Math.PI / 50;

    ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#00FF00';
      ctx.globalAlpha = 0.5;

      for(var i=0; i<health; i++) {
         var theta1 = start_theta + gap_theta;
         var theta2 = start_theta + d_theta - gap_theta;

         ctx.beginPath();
           ctx.arc(0, 0, 1.5*CH_WIDTH, theta1, theta2);
         ctx.stroke();

         start_theta += d_theta;
      }
    ctx.restore();
  };

  function drawCrosshair() {
    ctx.save();
      if(ready_to_fire === true) {
        ctx.strokeStyle = '#FF0000';
      } else {
        ctx.strokeStyle = '#0000FF';
      }
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.translate(canvas.width / 2, canvas.height / 2);

      ctx.beginPath();
        ctx.moveTo(-CH_WIDTH, 0);
        ctx.lineTo(CH_WIDTH, 0);

        ctx.moveTo(0, -CH_WIDTH);
        ctx.lineTo(0, CH_WIDTH);

        ctx.moveTo(0, 0);
        ctx.arc(0, 0, CH_WIDTH, 0, 2*Math.PI);

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
    var update = false;

    if(tank.readyToFire() !== ready_to_fire) {
      ready_to_fire = !ready_to_fire;
      update = true;
    }

    if(tank.getHealth() !== health) {
      health = tank.getHealth();
      update = true;
    }

    if(update === true) {
      draw();
    }
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
