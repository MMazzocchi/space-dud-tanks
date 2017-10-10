var EventEmitter = require('events');

var Scene = function() {
  var that = new EventEmitter();

  that.render = function() {
    that.emit('render');
  };

  that.resize = function(width, height) {
    that.emit('resize', width, height);
  };

  that.setupForMobile = function() {
    that.emit('setup_for_mobile');
  };

  return that;
};

module.exports = Scene;
