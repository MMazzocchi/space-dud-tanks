var Observable = require('./Observable.js');

var SimulationThread = function() {
  var that = new Observable(["tick"]);

  // Fields
  const TICK_INTERVAL = 1000;
  var interval_id = undefined;

  // Public functions
  that.start = function() {
    interval_id = setInterval(that.triggerTick, TICK_INTERVAL);
  };

  that.stop = function() {
    if(interval_id !== undefined) {
      clearInterval(interval_id);
    }

    interval_id = undefined;
  };

  return that;
};

module.exports = SimulationThread;
