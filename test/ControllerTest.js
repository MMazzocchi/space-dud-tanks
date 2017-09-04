var assert = require('assert');
var Controller = require('../server/player/Controller.js');
var DummyPlayer = require('./DummyPlayer.js');

const TEST_EVENT_TYPE = 'start';
const TEST_BUTTON_EVENT = {
  'id': 0,
  'type': 'button',
  'value': true
};

describe('Controller', function() {
  describe('#setNextEvent', function() {
    it('should call the callback when an event is provided', function(done) {
      var dummy_player = new DummyPlayer();
      var controller = new Controller(dummy_player);

      controller.setNextEvent(TEST_EVENT_TYPE, function(data, type) {
        assert.equal(data, TEST_BUTTON_EVENT);
        assert.equal(type, TEST_EVENT_TYPE);

        done();
      });

      dummy_player.simulateEvent(TEST_BUTTON_EVENT);
    });
  });

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
