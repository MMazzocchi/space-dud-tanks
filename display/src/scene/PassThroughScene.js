var Scene = require('./Scene.js');

var PassThroughScene = function(connection) {
  var that = new Scene();

  // Private methods
  function log(data) {
    console.log(data);
  };

  that.setup = function() {
    connection.on('event', log);
  };

  that.teardown = function() {
    connection.off('event', log);
  };

  return that;
};

module.exports = PassThroughScene;
