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
    state_event.data = that.getStateData();
    sendStateEvent();
  };

  // Public methods
  that.getStateData = function() {
    return {};
  };

  that.start = function() {
    sim_thread.onTick(tick);
  };

  that.stop = function() {
    // TODO: Remove tick() from simulation thread
  };

  return that;
};

module.exports = RealTimeScene;
