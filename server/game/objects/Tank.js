var GameObjectType = require('./GameObjectType.js');

var Tank = function() {
  var TankType = new GameObjectType('tank', ['x', 'y', 'z', 'theta',
                                             'color', 'health', 'cooldown']);

  const ROT_COEFF = 0.001;
  const THROTTLE_COEFF = 0.5;
  const BRAKE_COEFF = 0.5;
  const MAX_COOLDOWN = 1000;

  var constructor = function(x, y, z, theta, color) {
    var that = new TankType(x, y, z, theta, color, 10, 0);

    // Fields
    var left = 0;
    var right = 0;
    var throttle = 0;
    var brake = 0;

    // Public methods
    that.left = function(value) {
      left = value;
    };

    that.right = function(value) {
      right = value;
    };

    that.fire = function(value) {
      if(value === 1 && that.getCooldown() <= 0) {
        that.setCooldown(MAX_COOLDOWN);
      }
    };

    that.throttle = function(value) {
      throttle = value;
    };

    that.brake = function(value) {
      brake = value;
    };

    that.tick = function(delta) {
      var rot = (left - right) * delta * ROT_COEFF;
      that.setTheta(that.getTheta() + rot);

      var speed = (throttle * THROTTLE_COEFF) - (brake * BRAKE_COEFF);
      var dx = Math.sin(that.getTheta()) * speed;
      var dz = Math.cos(that.getTheta()) * speed;

      that.setX(that.getX() + dx);
      that.setZ(that.getZ() + dz);

      if(that.getCooldown() > 0) {
        that.setCooldown(that.getCooldown() - delta);
      }
    };

    return that;
  };

  return constructor;
}();

module.exports = Tank;
