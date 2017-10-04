var EventEmitter = require('events');

var Game = function() {
  var that = {};
  var clock = new EventEmitter();

  // Fields
  var room_hash = {};
  var last_update = new Date();

  // Private methods
  function tick() {
    var now = new Date();
    var delta = now - last_update;

    clock.emit('tick', delta, now);
    last_update = now;

    setImmediate(tick);
  };

  // Public methods
  that.addRoom = function(room) {
    clock.on('tick', room.tick);
  };

  that.removeRoom = function(room) {
    clock.removeListener('tick', room.tick);
  };

  setImmediate(tick);
  return that;
};

module.exports = Game;
