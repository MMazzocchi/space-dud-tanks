var EventEmitter = require('events');

var GameObjectConstructor = function(name) {

  var fields = [];

  function upperCaseToken(token) {
    return token.toUpperCase().replace("_", "");
  }

  var constructor = function() {
    var that = new EventEmitter();

    // Fields
    var data = {'type': name};

    // Private methods
    function addField(field, initial_value) {
      var caps_name = field.replace(/(^.|_.)/g, upperCaseToken);
      var setter = "set"+caps_name;
      var getter = "get"+caps_name;

      that[setter] = function(value) {
        data[field] = value;
      };

      that[getter] = function() {
        return data[field];
      };

      data[field] = initial_value;
    };

    function setup() {
      for(var i=0; i<fields.length; i++) {
        var field = fields[i];
        addField(field.name, field.initial_value);
      }
    };

    // Public methods
    that.getData = function() {
      return data;
    };

    that.tick = function(delta, time) {};

    setup();

    return that;
  };

  constructor.addField = function(field_name, initial_value) {
    fields.push({
      'name': field_name,
      'initial_value': initial_value
    })
  };

  return constructor;
};

module.exports = GameObjectConstructor;
