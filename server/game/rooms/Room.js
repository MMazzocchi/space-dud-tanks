var EventEmitter = requirE('events');

var Room = function() {
  var that = {};

  // Public methods
  that.tick = function(delta, now) {
    that.emit('tick', delta, now);
  };

  return that;
};

module.exports = Room;
