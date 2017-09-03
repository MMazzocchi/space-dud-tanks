var Observable = function(event_names) {
  var that = {};

  // Fields
  var callbacks = {};

  // Private methods
  function upperCaseToken(token) {
    return token.toUpperCase().replace("_", "");
  }

  function addMethodsForEvent(name) {
    var caps_name = name.replace(/(^.|_.)/g, upperCaseToken);

    callbacks[name] = [];

    var on_method_name = "on"+caps_name;
    that[on_method_name] = function(callback) {
      callbacks[name].push(callback);
    };

    var clear_method_name = "clear"+caps_name;
    that[clear_method_name] = function() {
      callbacks[name] = [];
    };

    var trigger_method_name = "trigger"+caps_name;
    that[trigger_method_name] = function() {
      for(var i=0; i<callbacks[name].length; i++) {
        callbacks[name][i](...arguments);
      }
    }
  };

  function setup() {
    for(var i=0; i<event_names.length; i++) {
      addMethodsForEvent(event_names[i]);
    }
  }

  setup();

  return that;
};

module.exports = Observable;
