var Observable = require('../util/Observable.js');

var SimulationThread = function() {
  var that = new Observable(["tick"]);

  // Fields
  const TICK_INTERVAL = 16;
  const OFFSET = 100;

  var interval_id = undefined;
  var last_update = new Date();

  // Private functions
  function tick() {
    var now = new Date();
    var delta = now - last_update;
    var future_time = now.getTime() + OFFSET;

    that.triggerTick(delta, future_time);
    last_update = now;
  };

  // Public functions
  that.start = function() {
    interval_id = setInterval(tick, TICK_INTERVAL);
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
