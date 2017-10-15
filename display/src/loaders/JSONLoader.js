var THREE = require('../../lib/three.min.js');

var JSONLoader = function() {

  // Static fields
  var that = {};
  var cache = {};
  var loader = new THREE.JSONLoader();

  // Private static functions
  function loadJSON(url) {
    return new Promise(function(resolve, reject) {
      loader.load(url,

        // On Load
        function(geometry, materials) {
          var data = {
            'geometry': geometry,
            'materials': materials
          };

          cache[url] = data;
          resolve(data);
        },

        // On progress
        function() {},

        // On error
        function() {
          reject(new Error("JSON object at "+url+" could not be loaded."));
        });
    });
  };

  function makeMesh(data) {
    return new THREE.Mesh(data.geometry, data.materials);
  };

  async function loadMesh(url) {
    var data = await loadJSON(url);
    var mesh = makeMesh(data);
    return mesh;
  };

  async function loadMeshFromCache(url) {
    var mesh = makeMesh(cache[url]);
    return mesh;
  };

  // Public static functions
  that.load = function(url) {
    if(cache[url] !== undefined) {
      return loadMeshFromCache(url);
    } else {
      return loadMesh(url);
    }
  }

  return that;
}();

module.exports = JSONLoader;
