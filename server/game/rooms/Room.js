var EventEmitter = require('events');

var Room = function() {
  var that = new EventEmitter();

  // Public methods
  that.tick = function(delta, now) {
    that.emit('tick', delta, now);
  };

  return that;
};

module.exports = Room;
