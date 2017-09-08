var SimulationThread = require('../SimulationThread.js');

var Room = function() {
  var that = {};

  // Fields
  var simulation_thread = new SimulationThread();

  // Public methods
  that.start = function() {
    simulation_thread.start();
  };

  that.stop = function() {
    simulation_thread.stop();
  };

  that.onTick = function(callback) {
    simulation_thread.onTick(callback);
  };

  return that;
};

module.exports = Room;
