var Scene = require('./Scene.js');
var Controller = require('./Controller.js');

var ControllerSetupScene = function(player, event_types) {
  var that = new Scene("controller_setup");

  // Fields
  var controller = new Controller(player);

  // Public functions
  that.start = function() {
    console.log("Starting the controller setup scene!!");

    var index = 0;

    function callback() {
      console.log("Callback!");
      var type = event_types[index];
      index += 1;

      console.log("Sending "+type+"...");
      player.sendEventToConsumers({
        'event_type': 'need_controller_event',
        'type': type
      });

      console.log("Sent!");

      if(index < event_types.length) {
        console.log("Waiting for next controller event...");
        controller.setNextEvent(type, callback);
      } else {
        controller.setNextEvent(type, that.next);
      }
    }

    callback();
  };

  return that;
};

module.exports = ControllerSetupScene;
