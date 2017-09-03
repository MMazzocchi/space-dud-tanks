var assert = require('assert');

var PassThroughScene = require('../server/PassThroughScene.js');
var DummyPlayer = require('./DummyPlayer.js');

const TEST_EVENT = { 
  'id': 0,
  'value': true,
  'type': 'button'
};

describe('PassThroughScene', function() {
  describe('start', function() {
    it('should send all events directory to consumers', function(done) {
      var player = new DummyPlayer();
      player.onSendEventToConsumers(function(data) {
        assert.equal(data, TEST_EVENT);
        done();
      });

      var scene = new PassThroughScene(player);
      scene.start();

      player.simulateEvent(TEST_EVENT);
    });
  });
});
