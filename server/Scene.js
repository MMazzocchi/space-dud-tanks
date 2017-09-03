var Scene = function(name) {
  var that = {};

  // Private fields
  var next_callback = undefined;

  // Public methods
  that.onNext = function(callback) {
    next_callback = callback;
  };

  that.next = function() {
    if(next_callback !== undefined) {
      next_callback();
    };
  };

  that.start = function() {
    throw new Error("Start should be overriden by child classes!");
  };

  that.getName = function() {
    return name;
  };

  return that;
};

module.exports = Scene;
