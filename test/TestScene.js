var Scene = require('../server/Scene.js');

var TestScene = function() {
  var that = new Scene();

  // Private fields
  var start_callback = undefined;

  that.onStart = function(callback) {
    start_callback = callback;
  };

  that.start = function() {
    start_callback();
  };

  return that;
};

module.exports = TestScene;
