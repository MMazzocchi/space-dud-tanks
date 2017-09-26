var Util = function() {
  that = {};

  // Public functions
  that.distance = function(obj1, obj2) {
    var dx = obj1.getX() - obj2.getX();
    var dy = obj1.getY() - obj2.getY();
    var dz = obj1.getZ() - obj2.getZ();

    return Math.sqrt((dx*dx)+(dy*dy)+(dz*dz));
  };

  return that;
}();

module.exports = Util;
