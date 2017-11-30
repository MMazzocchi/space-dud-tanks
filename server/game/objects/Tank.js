var EventEmitter = require('events');

var Tank = function(player_id, x, y, z, theta, color) {
  var that = new EventEmitter();

  // Constants
  const ROT_COEFF = 0.001;
  const THROTTLE_COEFF = 0.05;
  const BRAKE_COEFF = 0.05;
  const MAX_COOLDOWN = 1000;

  // Fields
  var left = 0;
  var right = 0;
  var throttle = 0;
  var brake = 0;
  var firing = 0;

  var cooldown = 0;

  // Private methods
  function rotate(delta) {
    var rot = (left - right) * delta * ROT_COEFF;
    theta += rot;
  };

  function move(delta) {
    var speed = (throttle * THROTTLE_COEFF) - (brake * BRAKE_COEFF);
    var dist = delta * speed;

    var dx = Math.sin(theta) * dist;
    var dz = Math.cos(theta) * dist;

    x += dx;
    z += dz;
  };

  function fire(delta) {
    if(cooldown > 0) {
      cooldown -= delta;

    } else if(firing === 1) {
      cooldown = MAX_COOLDOWN;
    }
  };

  // Public methods
  that.left = function(value) {
    left = value;
  };

  that.right = function(value) {
    right = value;
  };

  that.fire = function(value) {
    firing = value;
  };

  that.throttle = function(value) {
    throttle = value;
  };

  that.brake = function(value) {
    brake = value;
  };

  that.tick = function(delta) {
    rotate(delta);
    move(delta);
    fire(delta);
  };

  that.getPlayerId = function() { return player_id; };
  that.getX        = function() { return x; };
  that.getY        = function() { return y; };
  that.getZ        = function() { return z; };
  that.getTheta    = function() { return theta; };
  that.getColor    = function() { return color; };
  that.getCooldown = function() { return cooldown; };

  that.getData = function() {
    var data = {
      'player_id': player_id,
      'x': x,
      'y': y,
      'z': z,
      'theta': theta,
      'color': color,
      'cooldown': cooldown
    };

    return data;
  };

  return that; 
};

module.exports = Tank;
