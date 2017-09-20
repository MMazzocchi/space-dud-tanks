var Scene = function() {
  var that = new Observable('render', 'resize', 'setup_for_mobile');
  return that;
};
