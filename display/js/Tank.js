var Tank = function() {

  const MAX_SPEED = 0.6;
  const SPEED_COEF = 0.005;
  const ROT_COEF = 0.01;
  const DECAY = 0.01;
  const FORWARD = new THREE.Vector3(0, 0, 1);
  const MAX_COOLDOWN = 1000;


  function TankDef(mesh) {
    var that = {};

    // Fields
    var model = mesh;
    var barrel = model.children[0];
    var speed = 0;
    var throttle = 0;
    var left = 0;
    var right = 0;
    var fire = 0;
    var cooldown = 0;
    var health = 10;
    var shots = [];

    // Private functions
    function move() {
      if(throttle === 0) {
        speed -= DECAY;
      } else {
        speed += throttle*SPEED_COEF;
      }

      if(speed > MAX_SPEED) {
        speed = MAX_SPEED;
      } else if(speed < 0) {
        speed = 0;
      }

      model.translateOnAxis(FORWARD, speed);

      var rot = left - right;
      model.rotation.y += rot*ROT_COEF;
    };

    function attack() {
      if(cooldown === 0) {
        if(fire === 1) {
          var shot = new Shot(model.position.x, model.position.y+7, model.position.z);
          shots.push(shot);

          cooldown = MAX_COOLDOWN;
        }
      } else {
        cooldown -= 1;
      }
    };

    // Public functions
    that.getModel = function() {
      return model;
    };

    that.setColor = function(color) {
      model.material[2].color = new THREE.Color(color);
    };

    that.resetModel = function() {
      model.position = new THREE.Vector3(0, 0, 0);
      model.rotation = new THREE.Vector3(0, 0, 0);
      model.scale = new THREE.Vector3(1, 1, 1);

      return model;
    };

    that.setBarrelVisible = function(visible) {
      barrel.visible = visible;
    };

    that.throttle = function(value) {
      throttle = value;
    };

    that.left = function(value) {
      left = value;
    };

    that.right = function(value) {
      right = value;
    };

    that.fire = function(value) {
      fire = value;
    };

    that.step = function() {
      move();
      attack();
    };

    that.getHealth = function() {
      return health;
    };

    that.getNewShots = function() {
      var new_shots = shots;
      shots = [];
      return new_shots;
    };

    return that;
  };

  return TankModelLoader.load().then(TankDef);
};
