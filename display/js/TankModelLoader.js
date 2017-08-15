var TankModelLoader = function() {

  var that = {};
  var body = undefined;

  // Private static functions
  function loadMesh() {
    return JSONLoader.load('/json/tank.json').then(function(body_mesh) {

      body = body_mesh;
      return JSONLoader.load('/json/barrel.json');
    
    }).then(function(barrel) {

      body.add(barrel);
      return body;
    });
  }

  // Public static functions
  that.load = function() {
    return loadMesh();
  }

  return that;
}();
