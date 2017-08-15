var TankModelLoader = function() {

  var that = {};
  var body = undefined;

  // Private static functions
  function loadMesh() {
    console.log("setting up the load");

    return JSONLoader.load('/json/tank.json').then(function(body_mesh) {

      console.log("Loaded the body.");     
 
      body = body_mesh;
      return JSONLoader.load('/json/barrel.json');
    
    }).then(function(barrel) {

      console.log("Loaded the barrel");

      body.add(barrel);
      return body;
    });
  }

  // Public static functions
  that.load = function() {
    console.log("Loading tank model");
    return loadMesh();
  }

  return that;
}();
