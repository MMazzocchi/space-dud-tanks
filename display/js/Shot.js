var Shot = function() {

  const SPEED = 2;

  // Private static fields
  var geometry = new THREE.SphereGeometry(1, 15, 10);
  var materials = new THREE.MeshLambertMaterial( {color: 0x333333} );

  var ShotDef = function(x, y, z, theta) {
    var model = new THREE.Mesh(geometry, materials);
    var that = new GameObject(model);

    // Fields
    var life = 200;

    // Private methods
    function move() {
      var x = that.x();
      var z = that.z();

      x += SPEED*Math.sin(theta);
      z += SPEED*Math.cos(theta);

      that.setX(x);
      that.setZ(z);
    };

    function step() {
      move();

      if(life === 0) {
        that.done();
      } else {
        life -= 1;
      }
    };

    function setup() {
      that.setX(x);
      that.setY(y);
      that.setZ(z);

      that.addStepFunction(step);
    }

    setup();

    return that;
  };

  return ShotDef;
}();
