var Shot = function() {

  // Private static methods
  var geometry = new THREE.SphereGeometry(1, 15, 10);
  var materials = new THREE.MeshLambertMaterial( {color: 0x333333} );

  var ShotDef = function(x, y, z) {
    var model = new THREE.Mesh(geometry, materials);
    var that = new GameObject(model);

    that.setX(x);
    that.setY(y);
    that.setZ(z);

    return that;
  };

  return ShotDef;
}();
