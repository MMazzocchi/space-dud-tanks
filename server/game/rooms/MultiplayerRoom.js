var Room = require('./Room.js');

var MultiplayerRoom = function() {
  var that = new Room();

  // Fields
  var players = [];

  // Private methods
  function createStatePacket(now) {
    var packet = {
      'type': 'state',
      'time': now,
      'state': that.createState(now)
    };

    return packet;
  };

  function tick(delta, now) {
    var packet = createStatePacket(now);

    var length = players.length;
    for(var i=0; i<length; i++) {
      players[i].sendEventToConsumers(packet);
    }
  };

  function setupCallbacks() {
    setImmediate(function() {
      that.on('tick', tick);
    });
  };

  // Public methods
  that.createState = function(now) {
    return {};
  };

  that.addPlayer = function(player) {
    players.push(player);
  };

  setupCallbacks();

  return that;
};

module.exports = MultiplayerRoom;
