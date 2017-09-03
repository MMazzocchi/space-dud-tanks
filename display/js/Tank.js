var Tank = function() {

  const MAX_COOLDOWN = 100;

  function TankDef(mesh) {
    var that = new DrivableObject(mesh);

    // Fields
    var model = mesh;
    var barrel = model.children[0];
    var fire = 0;
    var cooldown = 0;
    var health = 10;
    var shots = [];

    // Private functions
    function attack() {
      if(cooldown === 0) {
        if(fire === 1) {
          var shot = new Shot(that.x(), that.y()+7, that.z());
          shots.push(shot);

          cooldown = MAX_COOLDOWN;
        }
      } else {
        cooldown -= 1;
      }
    };

    function setup() {
      that.addStepFunction(attack);
    };

    // Public functions
    that.getModel = function() {
      return model;
    };

    that.setColor = function(color) {
      model.material[2].color = new THREE.Color(color);
    };

    that.setBarrelVisible = function(visible) {
      barrel.visible = visible;
    };

    that.fire = function(value) {
      fire = value;
    };

    that.getHealth = function() {
      return health;
    };

    that.getNewShots = function() {
      var new_shots = shots;
      shots = [];
      return new_shots;
    };

    setup();

    return that;
  };

  return TankModelLoader.load().then(TankDef);
};
