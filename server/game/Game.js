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

  that.registerRoom = function(name, room) {
    room_hash[name] = room;
  };

  that.getRoom = function(name) {
    return room_hash[name];
  };

  that.start = function() {
    var names = Object.keys(room_hash);
    names.forEach(function(name) {
      room_hash[name].start();
    });
  };

  that.stop = function() {
    var names = Object.keys(room_hash);
    names.forEach(function(name) {
      room_hash[name].stop();
    });
  };

  setImmediate(tick);
  return that;
};

module.exports = Game;
