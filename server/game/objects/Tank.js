var GameObjectConstructor = require('./GameObjectConstructor.js');

var Tank = function() {
  var TankConstructor = new GameObjectConstructor('tank');

  TankConstructor.addField('player_id', 0);
  TankConstructor.addField('x', 0);
  TankConstructor.addField('y', 0);
  TankConstructor.addField('z', 0);
  TankConstructor.addField('theta', 0);
  TankConstructor.addField('color', '#000000');
  TankConstructor.addField('health', 10);
  TankConstructor.addField('cooldown', 0);

  const ROT_COEFF = 0.001;
  const THROTTLE_COEFF = 0.5;
  const BRAKE_COEFF = 0.5;
  const MAX_COOLDOWN = 1000;

  var constructor = function(player_id, x, y, z, theta, color) {
    var that = new TankConstructor();

    // Fields
    var left = 0;
    var right = 0;
    var throttle = 0;
    var brake = 0;

    // Private methods
    function setup() {
      that.setPlayerId(player_id);
      that.setX(x);
      that.setY(y);
      that.setZ(z);
      that.setTheta(theta);
      that.setColor(color);
    };

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

    setup();

    return that;
  };

  return constructor;
}();

module.exports = Tank;
