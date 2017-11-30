var setupScene = require('./Scene.js');
var Controller = require('../controller/Controller.js');

var ControllerSetupScene = function(player, ...event_types) {
  var controller = new Controller(player);

  function requestControllerEvent(type) {
    player.sendEventToConsumers({
      'event_type': 'need_controller_event',
      'type': type
    });
  };

  function setupController(resolve) {
    var index = 0;

    function callback() {
      if(index < event_types.length) {
        var type = event_types[index];
        index += 1;

        requestControllerEvent(type);
        controller.setNextEvent(type, callback);

      } else {
        controller.activate();
        resolve(controller);
      }
    };

    setImmediate(callback);
  };

  return setupScene('controller_setup', player).then(function() {
    return new Promise(setupController);
  });
};

module.exports = ControllerSetupScene;
