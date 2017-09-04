var GameObjectType = require('./GameObjectType.js');

var Tank = function() {
  var TankType = new GameObjectType(['x', 'y', 'z', 'theta',
                                     'color', 'health', 'cooldown']);

  const ROT_COEFF = 1.0;
  const MAX_COOLDOWN = 3000;

  var constructor = function(x, y, z, theta, color) {
    var that = new TankType(x, y, z, theta, color, 10, 0);

    // Fields
    var left = 0;
    var right = 0;

    // Public methods
    that.left = function(value) {
      left = value;
    };

    that.right = function(value) {
      right = value;
    };

    that.fire = function(value) {
      if(value === 1 && cooldown <= 0) {
        cooldown = MAX_COOLDOWN;
      }
    };

    that.update = function(delta) {
      var rot = (left - right) * delta * ROT_COEFF;
      that.setTheta(that.getTheta() + rot);

      if(cooldown > 0) {
        cooldown -= delta;
      }
    };
  };

  return constructor;
}();

module.exports = Tank;
