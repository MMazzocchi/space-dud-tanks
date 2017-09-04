var Scene = require('./Scene.js');

var RealTimeScene = function(name, game_data) {
  var that = new Scene(name);

  // Fields
  var player = game_data.player;
  var state_event = {
    'event_type': name+"_state",
    'data': {}
  };
  var sim_thread = game_data.game.getSimulationThread();

  // Private methods
  function sendStateEvent() {
    player.sendEventToConsumers(state_event);
  };

  function tick(delta) {
    sendStateEvent();
  };

  function setup() {
    sim_thread.onTick(tick);
  };

  // Public methods
  that.setStateData = function(data) {
    state_event.data = data;
  };

  that.stop = function() {
    // TODO: Remove tick() from simulation thread
  };

  setup();

  return that;
};

module.exports = RealTimeScene;
