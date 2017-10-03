var ControllerMappings = function() {
  var that = {};

  // Fields
  var axis_mappings = {};
  var button_mappings = {};

  // Private functions
  function mapButtonEvent(id, event_type) {
    button_mappings[id] = event_type;
  };

  function mapAxisEvent(id, value, event_type) {
    if(axis_mappings[id] === undefined) {
      axis_mappings[id] = {};
    }

    if(value > 0) {
      axis_mappings[id].positive = event_type;
    } else {
      axis_mappings[id].negative = event_type;
    }

    axis_mappings[id].last_event = event_type;
  };

  function getButtonMapping(id) {
    return button_mappings[id];
  };

  function getAxisMapping(id, value) {
    if(axis_mappings[id] !== undefined) {
      if(value > 0) {
        axis_mappings[id].last_event = axis_mappings[id].positive;
        return axis_mappings[id].positive;

      } else if(value < 0) {
        axis_mappings[id].last_event = axis_mappings[id].negative;
        return axis_mappings[id].negative;

      } else {
        return axis_mappings[id].last_event;
      }

    } else{
      return undefined;
    }
  };

  // Public functions
  that.setMappedEvent = function(data, event_type) {
    if(data.type === 'button') {
      mapButtonEvent(data.id, event_type);

    } else if(data.type === 'axis') {
      mapAxisEvent(data.id, data.value, event_type);
    }
  };

  that.getMappedEvent = function(data) {
    if(data.type === 'button') {
      return getButtonMapping(data.id);

    } else if(data.type === 'axis') {
      return getAxisMapping(data.id, data.value);
    }
  };

  that.hasMappedEvent = function(data) {
    if(that.getMappedEvent(data) !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  that.clearMappings = function() {
    button_mappings = {};
    axis_mappings = {};
  };

  return that;
};

module.exports = ControllerMappings;
