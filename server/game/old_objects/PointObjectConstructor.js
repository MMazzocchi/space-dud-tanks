var GameObjectConstructor = require('./GameObjectConstructor.js');

var PointObjectConstructor = function(type) {
  var constructor = new GameObjectConstructor(type);

  constructor.addField('x');
  constructor.addField('y');
  constructor.addField('z');

  return constructor;
};

module.exports = PointObjectConstructor;
