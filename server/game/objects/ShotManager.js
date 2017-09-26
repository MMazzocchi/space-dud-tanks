var Shot = require('./Shot.js');

var ShotManager = function(room) {
  var that = {};

  // Fields
  var shots = [];

  // Private methods
  function removeShotAtIndex(index) {
    var shot = shots[index].shot;

    room.removeObject(shot)
    shots.splice(index);
  };

  // Public methods
  that.add = function(player_id, x, y, z, theta) {
    var shot = new Shot(x, y, z, theta, that);

    shots.push({
      'player_id': player_id,
      'shot': shot
    });

    room.addObject(shot);
  };

  that.remove = function(shot) {
    for(var i=0; i<shots.length; i++) {
      if(shots[i].shot === shot) {
        removeShotAtIndex(i);
      }
    }
  };

  that.checkCollisions = function(tank) {
    var hit = false;
    var player_id = tank.getPlayerId();

    for(var i=0; i<shots.length; i++) {
      var shot = shots[i].shot;

      if((player_id !== shots[i].player_id) && 
         (shot.collide(tank) === true)) {

        removeShotAtIndex(i);
        hit = true;
      }
    }

    return hit;
  };

  return that;
};

module.exports = ShotManager;
