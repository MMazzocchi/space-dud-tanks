var TankModelLoader = function() {

  var that = {};

  // Static fields
  var loaded = false;
  var loader = new THREE.JSONLoader();
  var body_geometry = undefined;
  var body_materials = undefined;
  var barrel_geometry = undefined;
  var barrel_materials = undefined;

  // Private static functions
  function createMesh() {
    var body = new THREE.Mesh(body_geometry, body_materials);
    var barrel = new THREE.Mesh(barrel_geometry, barrel_materials);
    body.add(barrel);
    return body; 
  }

  function loadJSON(url) {
    return new Promise(function(resolve, reject) {

      loader.load(url,

        // On Load
        function(geometry, materials) {
          var obj = {
            'geometry': geometry,
            'materials': materials
          };
          resolve(obj);
        },

        // On progress
        function() {},

        // On error
        function() {
          reject(new Error("JSON object at "+url+" could not be loaded."));
        });
    });
  }

  function loadMesh() {
    return loadJSON('/json/tank.json').then(function(body_data) {

      body_geometry = body_data.geometry;
      body_materials = body_data.materials;

      return loadJSON('/json/barrel.json');
    
    }).then(function(barrel_data) {

      barrel_geometry = barrel_data.geometry;
      barrel_materials = barrel_data.materials;

      loaded = true;

      var mesh = createMesh();
      return mesh;
    });
  }

  // Public static functions
  that.load = function() {
    if(loaded === true) {
      return new Promise(function(resolve) {
        resolve(createMesh());
      });
    } else {
      return loadMesh();
    }
  }

  return that;
}();
