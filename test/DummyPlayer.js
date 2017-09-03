var DummyPlayer = function() {
  var that = {};

  // Private fields
  var event_callback = undefined;

  // Public functions
  that.onControllerEvent = function(callback) {
    event_callback = callback;
  };

  that.simulateEvent = function(data) {
    if(event_callback !== undefined) {
      event_callback(data);
    }
  };

  return that;
};

module.exports = DummyPlayer;
