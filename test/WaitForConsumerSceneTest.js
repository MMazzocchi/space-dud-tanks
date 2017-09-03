var assert = require('assert');

var WaitForConsumerScene = require('../server/scenes/WaitForConsumerScene.js');
var DummyPlayer = require('./DummyPlayer.js');

const TEST_EVENT = { 
  'id': 0,
  'value': true,
  'type': 'button'
};

describe('WaitForConsumerScene', function() {
  describe('start', function() {
    it('should wait for consumer', function(done) {
      var player = new DummyPlayer();
      var scene = new WaitForConsumerScene({ 'player': player });
      scene.onNext(done);
      scene.start();

      player.simulateAddConsumerClient();
    });
  });
});
