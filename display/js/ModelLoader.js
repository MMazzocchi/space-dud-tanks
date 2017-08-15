var ModelLoader = function() {

  var cache = {};

  var ModelLoaderDefinition = function() {
    var that = {};
  
    // Fields
    var loader = new THREE.JSONLoader();
  
    // Public functions
    that.loadTankModel = function(onLoad, onError) {
      if(cache['display'] !== undefined) {

      } else {

        loader.load('/json/tank.json',
  
          // On Load
          function(body_geometry, body_materials) {
            var body = new THREE.Mesh(body_geometry, body_materials);
  
            loader.load('/json/barrel.json',
  
              // On Load
              function(barrel_geometry, barrel_materials) {
                var barrel = new THREE.Mesh(barrel_geometry, barrel_materials);
                body.add(barrel);
  
                loaded = true;
  
                if(onLoad !== undefined) {
                  onLoad(body);
                };
              },
  
              // On progress
              function() {},
  
              // On error
              function() {
                if(onError !== undefined) {
                  onError();
                }
              });
          },
  
          // On progress
          function() {},
  
          // On error
          function() {
            if(onError !== undefined) {
              onError();
            }
          });
      }
    };
  
    return that;
  };

  return ModelLoaderDefinition;
}();
