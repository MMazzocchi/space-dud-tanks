var Shot = function() {

  // Private static methods
  var geometry = new THREE.SphereGeometry(1, 15, 10);
  var materials = new THREE.MeshLambertMaterial( {color: 0x333333} );

  var ShotDef = function(x, y, z) {
    var model = new THREE.Mesh(geometry, materials);
    var that = new GameObject(model);

    // Fields
    var life = 200;

    // Private methods
    function step() {
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
