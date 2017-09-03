var ControllerMappings = require('./ControllerMappings.js');

var Controller = (function() {

  // Private static fields
  const EVENT_TYPES = [
    'start',
    'throttle',
    'brake',
    'fire',
    'left',
    'right',
    'up',
    'down'
  ];

  var ControllerClass = function(player) {
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
    that.getEventTypes = function() {
      return EVENT_TYPES;
    };

    that.resetEventMappings = function() {
      event_mappings = {};
    };

    that.on = function(event_type, callback) {
      event_mappings[event_type] = async function(value) {
        callback(value)
      };
    };

    that.setNextEvent = function(event_type) {
      player.onControllerEvent(function(data) {
        if(controller_mappings.hasMappedEvent(data) === false) {
          controller_mappings.setMappedEvent(data, event_type);
          player.onControllerEvent(undefined);
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

  return ControllerClass;
})();

module.exports = Controller;
