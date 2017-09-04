var GameObjectType = require('./GameObjectType.js');

var Tank = function() {
  var TankType = new GameObjectType(['x', 'y', 'z', 'rx', 'ry', 'rz',
                                     'is_player']);

  const ROT_COEFF = 1.0;

  var constructor = function(...args) {
    var that = new TankType(...args);

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

    that.update = function(delta) {
      var rot = (left - right) * delta * ROT_COEFF;
      that.setRy(that.getRy() + rot);
    };
  };

  return constructor;
}();

module.exports = Tank;
