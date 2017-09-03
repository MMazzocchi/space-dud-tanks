var assert = require('assert');
var Controller = require('../server/Controller.js');
var DummyPlayer = require('./DummyPlayer.js');

const TEST_EVENT_TYPE = 'start';
const TEST_BUTTON_EVENT = {
  'id': 0,
  'type': 'button',
  'value': true
};

describe('Controller', function() {
  describe('#on', function() {
    it('should map a callback to an event type', function(done) {
      var dummy_player = new DummyPlayer();
      var controller = new Controller(dummy_player);

      controller.setNextEvent(TEST_EVENT_TYPE);
      dummy_player.simulateEvent(TEST_BUTTON_EVENT);

      controller.on(TEST_EVENT_TYPE, function(value) {
        assert.equal(value, TEST_BUTTON_EVENT.value);
        done();
      });

      controller.activate();
      dummy_player.simulateEvent(TEST_BUTTON_EVENT);
    });
  });
});
