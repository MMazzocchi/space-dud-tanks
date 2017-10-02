var EventEmitter = require('events');
var SimulationThread = require('../SimulationThread.js');

var Room = function(tick_interval, state_interval) {
  var that = new EventEmitter();

  // Fields
  var simulation_thread = new SimulationThread(tick_interval);
  var object_id = 0;
  var state_timer = 0;

  var objects = {};
  var players = [];

  var packet = {
    'event_type': 'room_state',
    'time': new Date().getTime(),
    'data': {
      'objects': {}
    }
  };


  // Private methods
  function tickAllObjects(delta, time) {
    packet.data.objects = {};

    var object_ids = Object.keys(objects);
    for(var i=0; i<object_ids.length; i++) {
      var id = object_ids[i];
      var object = objects[id];

      object.tick(delta, time);
      packet.data.objects[id] = object.getData();
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
    objects[object_id] = object;
    object_id += 1;
  };

  that.removeObject = function(object) {
    var object_ids = Object.keys(objects);
    for(var i=0; i<object_ids.length; i++) {
      var id = object_ids[i];
      if(object === objects[id]) {
        delete(objects[id]);
      }
    }
  };

  that.addPlayer = function(player) {
    players.push(player);
    that.emit('player_added', player);
  };

  that.removePlayer = function(player) {
    var index = players.indexOf(player);
    if(index !== -1) {
      players.splice(index, 1);
    }

    that.emit('player_removed', player);
  };

  setup();

  return that;
};

module.exports = Room;
