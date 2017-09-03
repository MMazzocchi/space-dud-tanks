var DummyPlayer = function() {
  var that = {};

  // Private fields
  var event_callback = undefined;
  var consumer_callback = undefined;
  var consumer_added_callback = undefined;

  // Public functions
  that.onControllerEvent = function(callback) {
    event_callback = callback;
  };

  that.simulateEvent = function(data) {
    if(event_callback !== undefined) {
      event_callback(data);
    }
  };

  that.onSendEventToConsumers = function(callback) {
    consumer_callback = callback;
  };

  that.sendEventToConsumers = function(data) {
    if(consumer_callback !== undefined) {
      consumer_callback(data);
    }
  };

  that.onConsumerAdded = function(callback) {
    consumer_added_callback = callback;
  };

  that.simulateAddConsumerClient = function() {
    consumer_added_callback(1);
  };

  return that;
};

module.exports = DummyPlayer;
