var Scene = require('../server/scenes/Scene.js');

var TestScene = function(start_callback) {

  var TestSceneGenerator = function() {
    var that = new Scene();

    // Private fields
    that.start = function() {
      if(start_callback !== undefined) {
        start_callback();
      } else {
        that.next();
      }
    };

    return that;
  };

  return TestSceneGenerator;
};

module.exports = TestScene;
