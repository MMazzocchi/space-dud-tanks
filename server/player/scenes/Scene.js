var EventEmitter = require('events');

var Scene = function(name) {
  var that = new EventEmitter();

  // Public methods
  that.next = function() {
    that.emit('next');
  };

  that.start = function() {
    throw new Error("Start should be overriden by child classes!");
  };

  that.stop = function() {
    // Not required to be overriden
  };

  that.getName = function() {
    return name;
  };

  return that;
};

module.exports = Scene;
