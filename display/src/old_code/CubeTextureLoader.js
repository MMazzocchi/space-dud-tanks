var THREE = require('../lib/three.min.js');
require('../lib/TGALoader');

var CubeTextureLoader = function() {
  var that = {};

  // Private static fields
  var cache = {};
  var loader = new THREE.TGALoader();

  // Private functions
  function loadTexture(url) {
    return new Promise(function(resolve, reject) {
      loader.load(url,

        // On load
        resolve,

        // On progress
        function() {},

        // On error
        function() {
          reject(new Error("Could not load texture at "+url));
        });
    });
  };

  function loadCubeTexture(url) {
    var cube_texture = new THREE.CubeTexture();

    return loadTexture(url+"/1.tga")
      .then(function(texture) {
        cube_texture.images[0] = texture.image;
        return loadTexture(url+"/2.tga");

      }).then(function(texture) {
        cube_texture.images[1] = texture.image;
        return loadTexture(url+"/3.tga");

      }).then(function(texture) {
        cube_texture.images[2] = texture.image;
        return loadTexture(url+"/4.tga");

      }).then(function(texture) {
        cube_texture.images[3] = texture.image;
        return loadTexture(url+"/5.tga");

      }).then(function(texture) {
        cube_texture.images[4] = texture.image;
        return loadTexture(url+"/6.tga");

      }).then(function(texture) {
        cube_texture.images[5] = texture.image;
        cube_texture.needsUpdate = true;
        return cube_texture;
      });
  };

  // Public functions
  that.load = function(url) {
    if(cache[url] !== undefined) {
      return new Promise(function(resolve, reject) {
        resolve(cache[url]);
      });

    } else {
      return loadCubeTexture(url);
    }
  };

  return that;

}();

module.exports = CubeTextureLoader;
