var SimulationThread = require('./SimulationThread.js');

var Game = function() {
  var that = {};

  // Fields
  var simulation_thread = new SimulationThread();

  // Private methods
  function setup() {
    simulation_thread.onTick(that.tick);
    simulation_thread.start();
  };

  // Public methods
  that.tick = function(delta) {};

  that.getSimulationThread = function() {
    return simulation_thread;
  };

  setup();

  return that;
};

module.exports = Game;
