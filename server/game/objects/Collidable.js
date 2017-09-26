var distance = require('../../util/Util.js').distance;

var Collidable = function() {
  var that = {};

  // Public methods
  that.augment = function(obj, radius) {
    obj.collide = function(other_obj) {
      var total_radius = obj.getRadius() + other_obj.getRadius();

      if(distance(obj, other_obj) < total_radius) {
        return true;

      } else {
        return false;
      }
    };

    obj.getRadius = function() {
      return radius;
    };
  };

  return that;
}();

module.exports = Collidable;
