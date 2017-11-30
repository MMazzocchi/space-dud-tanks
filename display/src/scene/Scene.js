var EventEmitter = require('events');

var Scene = function() {
  var that = new EventEmitter();

  // Public methods
  that.setup = function() {
    that.emit('setup');
  };

  that.teardown = function() {
    that.emit('teardown');
  };

  return that;
};

module.exports = Scene;
