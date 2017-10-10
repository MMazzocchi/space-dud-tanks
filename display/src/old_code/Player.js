var Player = (function() {

  // Static fields
  const ACC_CONSTANT = 0.0015;
  const TURN_CONSTANT = 0.02;

  var PlayerDef = function(ship, model) {
    var that = {};
  
    // Fields
    var acceleration = 0;
    var speed = 0;
    var left = 0;
    var right = 0;
    var down = 0;
    var up = 0;
 
    // Public functions
    that.setAcceleration = function(value) {
      acceleration = value*ACC_CONSTANT;
    };

    that.setLeft = function(value) {
      left = value;
    };

    that.setRight = function(value) {
      right = value;
    };

    that.setUp = function(value) {
      up = value;
    };

    that.setDown = function(value) {
      down = value;
    };

    that.step = function() {
      speed += acceleration;
      model.rotateY(TURN_CONSTANT*(left-right));
      model.rotateX(TURN_CONSTANT*(down-up));
      model.translateZ(-speed);
    };
 
    return that;
  };

  return PlayerDef;
})();

module.exports = Player;
