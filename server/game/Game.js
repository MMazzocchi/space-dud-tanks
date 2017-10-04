var EventEmitter = require('events');
var SpaceDud = require('space-dud');

var Game = function(http) {
  var that = {};

  // Fields
  var room_hash = {};
  var last_update = new Date();
  var clock = new EventEmitter();
  var space_dud = new SpaceDud(http);

  // Private methods
  function tick() {
    var now = new Date();
    var delta = now - last_update;

    clock.emit('tick', delta, now);
    last_update = now;

    setImmediate(tick);
  };

  function setupCallbacks() {
    setImmediate(function() {
      space_dud.getGame().on('player_ready', that.playerReady);
    });

    setImmediate(tick);
  };

  // Public methods
  that.addRoom = function(room) {
    clock.on('tick', room.tick);
  };

  that.removeRoom = function(room) {
    clock.removeListener('tick', room.tick);
  };

  that.playerReady = function(player) {};

  // After everything else is done, setup the callbacks
  setImmediate(setupCallbacks);

  return that;
};

module.exports = Game;
