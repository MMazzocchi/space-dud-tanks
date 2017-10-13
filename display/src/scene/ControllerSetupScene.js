var Scene = require('./Scene.js');

var ControllerSetupScene = function(connection) {
  var that = new Scene();

  // Private functions
  function handleEventRequest(data) {
    console.log(data);
  };

  that.on('setup', function() {
    connection.onEventType('need_controller_event', handleEventRequest);
  });

  that.on('teardown', function() {
    connection.offEventType('need_controller_event', handleEventRequest);
  });

  return that;
};

module.exports = ControllerSetupScene;
