var Scene = require('./Scene.js');
var Controller = require('./Controller.js');

var ControllerSetupScene = function(player, event_types) {
  var that = new Scene("controller_setup");

  // Fields
  var controller = new Controller(player);

  // Public functions
  that.start = function() {
    var index = 0;

    function callback() {
      var type = event_types[index];
      index += 1;

      player.sendEventToConsumers({
        'event_type': 'need_controller_event',
        'type': type
      });

      if(index < event_types.length) {
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
