var DrivableObject = function() {

  // Static fields
  const FORWARD = new THREE.Vector3(0, 0, 1);

  var DrivableObjectDef = function(model) {
    var that = new GameObject(model);
  
    // Private fields
    var speed = 0;
    var throttle = 0;
    var left = 0;
    var right = 0;
  
    // Public fields
    that.MAX_SPEED = 0.6;
    that.SPEED_COEF = 0.005;
    that.ROT_COEF = 0.01;
    that.DECAY = 0.01;
  
    // Private methods
    function move() {
      if(throttle === 0) {
        speed -= that.DECAY;
      } else {
        speed += throttle*that.SPEED_COEF;
      }
  
      if(speed > that.MAX_SPEED) {
        speed = that.MAX_SPEED;
      } else if(speed < 0) {
        speed = 0;
      }
  
      model.translateOnAxis(FORWARD, speed);
  
      var rot = left - right;
      model.rotation.y += rot*that.ROT_COEF;
    };
  
    function setup() {
      that.addStepFunction(move);
    };
  
    // Public functions
    that.throttle = function(value) { throttle = value; };
    that.left     = function(value) { left     = value; };
    that.right    = function(value) { right    = value; };
  
    setup();
  
    return that;
  };

  return DrivableObjectDef;
}();
