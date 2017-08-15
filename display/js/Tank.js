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

    return that;
  };

  return TankModelLoader.load().then(TankDef);
};
