var setupScene = require('./Scene.js');

var ArenaScene = function(player, color, controller, room) {

  function enterArena() {
    return new Promise(function(resolve, reject) {
      var tank = room.createTank(player, color);

      controller.on('left', tank.left);
      controller.on('right', tank.right);
      controller.on('throttle', tank.throttle);
      controller.on('brake', tank.brake);
      controller.on('fire', tank.fire);

      player.on('disconnect', resolve);
    });
  };

  return setupScene('arena', player).then(enterArena);
};

module.exports = ArenaScene;
