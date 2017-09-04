var Scene = require('./Scene.js');

var RealTimeScene = function(name, game_data) {
  var that = new Scene(name);

  // Fields
  var id = 0;
  var objects = [];
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

  function tick(delta) {
    updateStateEvent(delta);
    sendStateEvent();
  };

  function setup() {
    sim_thread.onTick(tick);
  };

  // Public methods
  that.addObject = function(object) {
    objects.push({
      'id': id,
      'object': object
    });

    id += 1;
  };

  that.stop = function() {
    // TODO: Remove tick() from simulation thread
  };

  setup();

  return that;
};

module.exports = RealTimeScene;
