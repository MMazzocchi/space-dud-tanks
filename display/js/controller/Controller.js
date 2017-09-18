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

  var ControllerClass = function(client) {
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
    that.getEventTypes = function() { return EVENT_TYPES; };
    that.resetEventMappings = function() { event_mappings = {}; };

    that.on = function(event_type, callback) {
      event_mappings[event_type] = async function(value) { 
        callback(value)
      };
    };

    that.setNextEvent = function(event_type, callback) {
      var controller_callback = function(data) {
        if(controller_mappings.hasMappedEvent(data) === false) {
          client.offEventType("controller", controller_callback);

          controller_mappings.setMappedEvent(data, event_type);
          callback();
        }
      };

      client.onEventType("controller", controller_callback);
    };

    that.activate = function() {
      client.onEvent(function(data) {
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
