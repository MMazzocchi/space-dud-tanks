var Scene = require('./Scene.js');

var LogScene = function(connection) {
  var that = new Scene();

  // Private methods
  function log(data) {
    console.log(data);
  };

  that.on('setup', function() {
    connection.on('event', log);
  });

  that.on('teardown', function() {
    connection.off('event', log);
  });

  return that;
};

module.exports = LogScene;
