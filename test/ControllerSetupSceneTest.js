var assert = require('assert');
var ControllerSetupScene = require('../server/scenes/ControllerSetupScene.js');
var DummyPlayer = require('./DummyPlayer.js');
var wait = require('./Util.js').wait;

const EVENT_TYPES = ['start', 'throttle', 'brake', 'fire',
                     'left', 'right', 'up', 'down'];
const TEST_EVENTS = [
  { 
    'id': 0,
    'value': true,
    'type': 'button'
  },
  { 
    'id': 1,
    'value': -1,
    'type': 'axis'
  },
  { 
    'id': 1,
    'value': 1,
    'type': 'axis'
  },
  { 
    'id': 1,
    'value': true,
    'type': 'button'
  },
  { 
    'id': 2,
    'value': -1,
    'type': 'axis'
  },
  { 
    'id': 2,
    'value': 1,
    'type': 'axis'
  },
  { 
    'id': 2,
    'value': true,
    'type': 'button'
  },
  { 
    'id': 3,
    'value': -1,
    'type': 'axis'
  }
];

describe('ControllerSetupScene', function() {
  describe('#start', function() {
    it('should assign all event types', function(done) {
      var player = new DummyPlayer();
      var scene = new ControllerSetupScene({ 'player': player });
      scene.onNext(done);

      scene.start();
      var index = 0;

      function simulateEvent() {
        player.simulateEvent(TEST_EVENTS[index]);

        index += 1;
        if(index !== TEST_EVENTS.length) {
          return wait(100).then(simulateEvent);
        }
      }

      wait(100).then(simulateEvent);
    });
  });
});
