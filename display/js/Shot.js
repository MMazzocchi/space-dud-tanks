var Shot = function() {

  // Private static methods
  var geometry = new THREE.SphereGeometry(1, 15, 10);
  var materials = new THREE.MeshLambertMaterial( {color: 0x333333} );

  var ShotDef = function(x, y, z) {
    var that = {};

    // Private fields
    var model = new THREE.Mesh(geometry, materials);
    model.position.x = x;
    model.position.y = y;
    model.position.z = z;

    // Public methods
    that.getModel = function() {
      return model;
    };

    return that;
  };

  return ShotDef;
}();
