var ControllerMappings = require('./ControllerMappings.js');
var Observable = require('./Observable.js');

var Controller = function(player) {
  var that = {};

  // Fields
  var event_mappings = {};
  var controller_mappings = new ControllerMappings();

  // Private methods
  function handleEvent(event_type, value) {
    if(event_mappings[event_type] !== undefined) {
      event_mappings[event_type].triggerEvent(Math.abs(value));
    }
  }

  // Public methods
  that.resetEventMappings = function() {
    event_mappings = {};
  };

  that.on = function(event_type, callback) {
    if(event_mappings[event_type] === undefined) {
      event_mappings[event_type] = new Observable(['event']);
    }

    event_mappings[event_type].onEvent(callback);
  };

  that.setNextEvent = function(event_type, callback) {
    console.log("Setting next event to: "+event_type);

    player.onControllerEvent(function(data) {
      console.log("Got an event: "+JSON.stringify(data));

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
