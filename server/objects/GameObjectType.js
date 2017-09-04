var GameObjectType = function(fields) {

  function upperCaseToken(token) {
    return token.toUpperCase().replace("_", "");
  }

  var constructor = function() {
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
        addField(fields[i]);
      }
    };

    // Public methods
    that.getData = function() {
      return data;
    };

    setup();

    return that;
  };

  return constructor;
};

module.exports = GameObjectType;
