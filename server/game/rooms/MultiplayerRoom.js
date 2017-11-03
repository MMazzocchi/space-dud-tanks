var Room = require('./Room.js');

const DEFAULT_UPDATE_INTERVAL = 33;

var MultiplayerRoom = function(update_interval) {
  var that = new Room();

  if(update_interval === undefined) {
    update_interval = DEFAULT_UPDATE_INTERVAL;
  }

  // Fields
  var players = [];
  var last_update = new Date();

  // Private methods
  function createStatePacket(now) {
    var packet = {
      'event_type': 'room_state',
      'time': now,
      'state': that.createState(now)
    };

    return packet;
  };

  function sendUpdate(now) {
    var packet = createStatePacket(now);

    var length = players.length;
    for(var i=0; i<length; i++) {
      players[i].sendEventToConsumers(packet);
    }
  }

  function tick(delta, now) {
    if((now - last_update) > update_interval) {
      sendUpdate(now);
      last_update = now;
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

    player.on('disconnect', function() {
      var index = players.indexOf(player);
      players.splice(index, 1);
    });
  };

  setupCallbacks();

  return that;
};

module.exports = MultiplayerRoom;
