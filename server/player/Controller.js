var ControllerMappings = require('./ControllerMappings.js');
var Observable = require('../util/Observable.js');

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
      event_mappings[event_type] = new Observable('event');
    }

    event_mappings[event_type].onEvent(callback);
  };

  that.setNextEvent = function(event_type, callback) {
    var event_callback = function(data) {
      if(controller_mappings.hasMappedEvent(data) === false) {
        controller_mappings.setMappedEvent(data, event_type);
        player.removeListener('controller_event', event_callback);

        if(callback !== undefined) {
          callback(data, event_type);
        }
      }
    };

    player.on('controller_event', event_callback);
  };

  that.activate = function() {
    player.on('controller_event', function(data) {
      var event_type = controller_mappings.getMappedEvent(data);
      if(event_type !== undefined) {
        handleEvent(event_type, data.value);
      }
    });
  };

  return that;
};

module.exports = Controller;
