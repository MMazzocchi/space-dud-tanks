var ControllerMappings = require('./ControllerMappings.js');

var Controller = function(player) {
  var that = {};

  // Fields
  var event_mappings = {};
  var controller_mappings = new ControllerMappings();

  // Private methods
  function handleEvent(event_type, value) {
    if(event_mappings[event_type] !== undefined) {
      event_mappings[event_type](Math.abs(value));
    }
  }

  // Public methods
  that.resetEventMappings = function() {
    event_mappings = {};
  };

  that.on = function(event_type, callback) {
    event_mappings[event_type] = async function(value) {
      callback(value)
    };
  };

  that.setNextEvent = function(event_type, callback) {
    player.onControllerEvent(function(data) {
      if(controller_mappings.hasMappedEvent(data) === false) {
        controller_mappings.setMappedEvent(data, event_type);
        player.onControllerEvent(undefined);

        if(callback !== undefined) {
          callback(data, event_type);
        }
      }
    });
  };

  that.activate = function() {
    player.onControllerEvent(function(data) {
      var event_type = controller_mappings.getMappedEvent(data);
      if(event_type !== undefined) {
        handleEvent(event_type, data.value);
      }
    });
  };

  return that;
};

module.exports = Controller;