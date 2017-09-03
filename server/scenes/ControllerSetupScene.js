var Scene = require('./Scene.js');
var Controller = require('../Controller.js');

var ControllerSetupScene = function(game_data) {
  var that = new Scene("controller_setup");

  // Fields
  var player = game_data.player;
  var controller = new Controller(player);
  var event_types = ['start', 'throttle', 'brake', 'fire',
                     'left', 'right', 'up', 'down'];

  // Public functions
  that.start = function() {
    var index = 0;

    function done() {
      controller.activate();
      game_data.controller = controller;
      that.next();
    };

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
        controller.setNextEvent(type, done);
      }
    };

    callback();
  };

  return that;
};

module.exports = ControllerSetupScene;
