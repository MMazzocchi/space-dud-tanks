var Tank = function() {

  function TankDef(mesh) {
    var that = {};

    // Fields
    var model = mesh;

    // Public functions
    that.getModel = function() {
      return model;
    };

    that.setColor = function(color) {
      model.material[2].color = new THREE.Color(color);
    };

    that.resetModel = function() {
      model.position = new THREE.Vector3(0, 0, 0);
      model.rotation = new THREE.Vector3(0, 0, 0);
      model.scale = new THREE.Vector3(1, 1, 1);

      return model;
    };

    return that;
  };

  return TankModelLoader.load().then(TankDef);
};
