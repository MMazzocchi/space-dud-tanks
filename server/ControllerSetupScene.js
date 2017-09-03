var Scene = require('./Scene.js');
var Controller = require('./Controller.js');

var ControllerSetupScene = function(player, event_types) {
  var that = new Scene();

  // Fields
  var controller = new Controller(player);

  // Public functions
  that.start = function() {
    var index = 0;

    function callback() {
      var type = event_types[index];
      index += 1;

      // TODO: Communicate with client

      if(index < event_types.length) {
        controller.setNextEvent(type, callback);
      } else {

        // TODO: Pass on the controller?
        controller.setNextEvent(type, that.next);
      }
    }

    callback();
  };

  return that;
};

module.exports = ControllerSetupScene;
