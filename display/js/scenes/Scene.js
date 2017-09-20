var Scene = function() {
  var that = new Observable('render', 'resize');

  // Public functions
  that.setupForMobile = function() {};

  return that;
};
