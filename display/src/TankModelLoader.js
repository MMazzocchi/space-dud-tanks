var TankModelLoader = function() {

  var that = {};

  // Private static functions
  async function loadMesh() {
    var body = await JSONLoader.load('/json/tank.json');
    var barrel = await JSONLoader.load('/json/barrel.json');

    body.add(barrel);
    return body;
  }

  // Public static functions
  that.load = function() {
    return loadMesh();
  }

  return that;
}();
