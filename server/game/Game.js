var SimulationThread = require('./SimulationThread.js');

var Game = function() {
  var that = {};

  // Fields
  var simulation_thread = new SimulationThread();

  // Public methods
  that.tick = function(delta) {};

  that.getSimulationThread = function() {
    return simulation_thread;
  };

  that.start = function() {
    simulation_thread.onTick(that.tick);
    simulation_thread.start();
  };

  return that;
};

module.exports = Game;
