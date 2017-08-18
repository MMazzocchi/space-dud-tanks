var Tank = function() {

  const MAX_SPEED = 0.5;
  const SPEED_COEF = 0.005;
  const DECAY = 0.01;
  const FORWARD = new THREE.Vector3(0, 0, -1);

  function TankDef(mesh) {
    var that = {};

    // Fields
    var model = mesh;
    var barrel = model.children[0];
    var speed = 0;
    var throttle = 0;

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

    that.step = function() {
      if(throttle === 0) {
        speed -= DECAY;
      } else {
        speed += throttle*SPEED_COEF;
      }

      if(speed > MAX_SPEED) {
        speed = MAX_SPEED;
        console.log("MAX!");
      } else if(speed < 0) {
        speed = 0;
      }

      model.translateOnAxis(FORWARD, speed);
    };

    return that;
  };

  return TankModelLoader.load().then(TankDef);
};
