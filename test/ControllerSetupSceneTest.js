var assert = require('assert');
var ControllerSetupScene = require('../server/ControllerSetupScene.js');
var DummyPlayer = require('./DummyPlayer.js');
var wait = require('./Util.js').wait;

const TEST_EVENT_TYPES = [ 'start', 'left', 'right' ];
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
  }
];

describe('ControllerSetupScene', function() {
  describe('#start', function() {
    it('should assign all event types', function(done) {
      var player = new DummyPlayer();
      var scene = new ControllerSetupScene(player, TEST_EVENT_TYPES);
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
