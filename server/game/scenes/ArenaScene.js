var setupScene = require('./Scene.js');

var ArenaScene = function(player, color, room) {

  function enterArena() {
    return new Promise(function(resolve, reject) {
      var tank = room.createTank(player, color);

      player.on('disconnect', resolve);
    });
  };

  return setupScene('arena', player).then(enterArena);
};

module.exports = ArenaScene;
