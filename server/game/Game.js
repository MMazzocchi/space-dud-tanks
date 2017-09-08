var Game = function() {
  var that = {};

  // Fields
  var rooms = {};

  // Public methods
  that.registerRoom = function(name, room) {
    rooms[name] = room;
  };

  that.getRoom = function(name) {
    return rooms[name];
  };

  that.start = function() {
    var names = Object.keys(rooms);
    names.forEach(function(name) {
      rooms[name].start();
    });
  };

  that.stop = function() {
    var names = Object.keys(rooms);
    names.forEach(function(name) {
      rooms[name].stop();
    });
  };

  return that;
};

module.exports = Game;
