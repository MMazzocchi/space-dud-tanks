var setupScene = require('./Scene.js');

var ArenaScene = function(player, room) {

  function enterArena() {
    return new Promise(function(resolve, reject) {
      room.addPlayer(player);
    });
  };

  return setupScene('arena', player).then(enterArena);
};

module.exports = ArenaScene;
