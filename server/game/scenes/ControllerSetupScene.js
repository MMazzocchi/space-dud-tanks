var setupScene = require('./Scene.js');

var ControllerSetupScene = function(player, ...event_types) {
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
      } else {
        resolve();
      }
    };

    setImmediate(callback);
  };

  return setupScene('controller_setup', player).then(function() {
    return new Promise(setupController);
  });
};

module.exports = ControllerSetupScene;
