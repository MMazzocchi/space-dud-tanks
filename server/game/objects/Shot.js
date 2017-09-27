var PointObjectConstructor = require('./PointObjectConstructor.js');
var Collidable = require('./Collidable.js');

var Shot = function() {
  var ShotConstructor = new PointObjectConstructor('shot');

  ShotConstructor.addField('shot_id');
  ShotConstructor.addField('theta');

  const MAX_LIFE = 1000;
  const RADIUS = 1;
  const SPEED = 0.1;

  var constructor = function(shot_id, x, y, z, theta, shot_manager) {
    var that = new ShotConstructor();
    Collidable.augment(that, RADIUS);

    // Fields
    var life = MAX_LIFE;

    // Private functions
    function setup() {
      that.setShotId(shot_id);
      that.setX(x);
      that.setY(y);
      that.setZ(z);
      that.setTheta(theta);
    };

    // Public functions
    that.tick = function(delta, time) {
      var dist = delta * SPEED;

      var dx = Math.sin(that.getTheta()) * dist;
      var dz = Math.cos(that.getTheta()) * dist;

      that.setX(that.getX() + dx);
      that.setZ(that.getZ() + dz);

      life = life - delta;
      if(life <= 0) {
        shot_manager.remove(that);
      }
    };

    setup();

    return that;
  };

  return constructor;
}();

module.exports = Shot;
