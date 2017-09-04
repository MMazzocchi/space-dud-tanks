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
  var sim_thread = game_data.game.getSimulationThread();

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

  function step() {
    var now = new Date();
    var delta = now - last_update;

    updateStateEvent(delta);
    sendStateEvent();

    last_update = now;
  };

  function setup() {
    sim_thread.clearTick();
    sim_thread.onTick(step);
  };

  // Public methods
  that.addObject = function(object) {
    objects.push({
      'id': id,
      'object': object
    });

    id += 1;
  };

  return that;
};

module.exports = RealTimeScene;
