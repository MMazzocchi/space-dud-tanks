var GameObjectType = function(fields) {

  function upperCaseToken(token) {
    return token.toUpperCase().replace("_", "");
  }

  var constructor = function(...args) {
    var that = {};

    // Fields
    var data = {};

    // Private methods
    function addField(field) {
      var caps_name = field.replace(/(^.|_.)/g, upperCaseToken);
      var setter = "set"+caps_name;
      var getter = "get"+caps_name;

      that[setter] = function(value) {
        data[field] = value;
      };

      that[getter] = function() {
        return data[field];
      };
    };

    function setup() {
      for(var i=0; i<fields.length; i++) {
        var field = fields[i];
        addField(field);

        if(args[i] !== undefined) {
          data[field] = args[i];
        }
      }
    };

    // Public methods
    that.getData = function() {
      return data;
    };

    that.update = function(delta) {};

    setup();

    return that;
  };

  return constructor;
};

module.exports = GameObjectType;
