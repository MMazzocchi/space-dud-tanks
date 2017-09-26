var SimulationThread = require('../SimulationThread.js');
var Observable = require('../../util/Observable.js');

var Room = function(tick_interval, state_interval) {
  var that = new Observable('player_added', 'player_removed');

  // Fields
  var simulation_thread = new SimulationThread(tick_interval);

  var objects = [];
  var players = [];

  var packet = {
    'event_type': 'room_state',
    'time': new Date().getTime(),
    'data': {
      'objects': []
    }
  };

  var state_timer = 0;

  // Private methods
  function tickAllObjects(delta, time) {
    packet.data.objects.length = 0;

    for(var i=0; i<objects.length; i++) {
      var object = objects[i];
      object.tick(delta, time);

      packet.data.objects.push(object.getData());
    }

    packet.time = time;
  };

  function sendStatePacket() {
    for(var i=0; i<players.length; i++) {
      var player = players[i];
      player.sendEventToConsumers(packet);
    }
  };

  function tick(delta, time) {
    tickAllObjects(delta, time);

    state_timer += delta;
    if(state_timer >= state_interval) {
      sendStatePacket();
      state_timer = 0;
    }
  };

  function setup() {
    simulation_thread.onTick(tick);
  };

  // Public methods
  that.start = function() {
    simulation_thread.start();
  };

  that.stop = function() {
    simulation_thread.stop();
  };

  that.onTick = function(callback) {
    simulation_thread.onTick(callback);
  };

  that.addObject = function(object) {
    objects.push(object);
  };

  that.removeObject = function(object) {
    var index = objects.indexOf(object);
    if(index !== -1) {
      objects.splice(index, 1);
    }
  };

  that.addPlayer = function(player) {
    players.push(player);
    that.triggerPlayerAdded(player);
  };

  that.removePlayer = function(player) {
    var index = players.indexOf(player);
    if(index !== -1) {
      players.splice(index, 1);
    }

    that.triggerPlayerRemoved(player);
  };

  setup();

  return that;
};

module.exports = Room;
