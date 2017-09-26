var PointObjectConstructor = require('./PointObjectConstructor.js');
var Collidable = require('./Collidable.js');

var Shot = function() {
  var ShotConstructor = new PointObjectConstructor('shot');

  ShotConstructor.addField('theta');

  const MAX_LIFE = 1000;
  const RADIUS = 1;

  var constructor = function(x, y, z, theta, shot_manager) {
    var that = new ShotConstructor();
    Collidable.augment(that, RADIUS);

    // Fields
    var life = MAX_LIFE;

    // Private functions
    function setup() {
      that.setX(x);
      that.setY(y);
      that.setZ(z);
      that.setTheta(theta);
    };

    // Public functions
    that.tick = function(delta, time) {
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
