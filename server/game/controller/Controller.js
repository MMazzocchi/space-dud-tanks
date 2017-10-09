var EventEmitter = require('events');
var ControllerMappings = require('./ControllerMappings.js');

var Controller = function(player) {
  var that = new EventEmitter();

  // Fields
  var controller_mappings = new ControllerMappings();

  // Private methods
  function handleEvent(data) {
      var event_type = controller_mappings.getMappedEvent(data);
      if(event_type !== undefined) {
        that.emit(event_type, Math.abs(data.value));
      }
  };

  // Public methods
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
    player.on('controller_event', handleEvent);
  };

  return that;
};

module.exports = Controller;
