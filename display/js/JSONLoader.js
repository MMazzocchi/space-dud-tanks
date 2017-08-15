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

  function loadMesh(url) {
    return loadJSON(url).then(makeMesh);
  };

  // Public static functions
  that.load = function(url) {
    if(cache[url] !== undefined) {
      return new Promise(function(resolve) {
        var mesh = makeMesh(cache[url]);
        resolve(mesh);
      });

    } else {
      return loadMesh(url);
    }
  }

  return that;
}();
