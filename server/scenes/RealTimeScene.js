var Scene = require('./Scene.js');

var RealTimeScene = function(name, game_data) {
  var that = new Scene(name);

  // Fields
  var id = 0;
  var objects = [];
  var last_update = new Date();
  var player = game_data.player;
  var state_event = {
    'event_type': name+"_state"
  };

  // Private methods
  function updateStateEvent(delta) {
    for(var i=0; i<objects.length; i++) {
      var object = objects[i].object;

      object.update(delta);
      state_event[objects[i].id] = object.getData();
    }
  };

  function sendStateEvent() {
    player.sendEventToConsumers(state_event);
  };

  // Public methods
  that.addObject = function(object) {
    objects.push({
      'id': id,
      'object': object
    });

    id += 1;
  };

  that.step = function() {
    var now = new Date();
    var delta = now - last_update;

    updateStateEvent(delta);
    sendStateEvent();

    last_update = now;
  };

  return that;
};

module.exports = RealTimeScene;
