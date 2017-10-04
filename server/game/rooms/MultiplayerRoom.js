var Room = require('./Room.js');

var MultiplayerRoom = function() {
  var that = new Room();

  // Fields
  var players = [];

  // Private methods
  function createStatePacket(now) {
    var packet = {
      'time': now,
      'state': that.createState(now)
    };

    return packet;
  };

  function tick(delta, now) {
    var packet = createStatePacket(now);

    var length = players.length;
    for(var i=0; i<players.length; i++) {
      player[i].sendEventToConsumers(packet);
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

  setupCallbacks();

  return that;
};

module.exports = MultiplayerRoom;
