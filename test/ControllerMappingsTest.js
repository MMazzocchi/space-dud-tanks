var assert = require('assert');
var ControllerMappings = require('../server/ControllerMappings.js');

const TEST_EVENT_TYPE_1 = 'start';
const TEST_EVENT_TYPE_2 = 'select';

const TEST_BUTTON_EVENT = {
  'id': 0,
  'type': 'button',
  'value': true
};

const TEST_AXIS_EVENT_NEG = {
  'id': 0,
  'type': 'axis',
  'value': -0.5
};

const TEST_AXIS_EVENT_POS = {
  'id': 0,
  'type': 'axis',
  'value': 0.5
}

describe('ControllerMappings', function() {

  describe('#setMappedEvent', function() {
    it('should map button events', function() {
      var mappings = new ControllerMappings();
      mappings.setMappedEvent(TEST_BUTTON_EVENT, TEST_EVENT_TYPE_1);

      var type = mappings.getMappedEvent(TEST_BUTTON_EVENT);
      assert.equal(type, TEST_EVENT_TYPE_1);
    });

    it('should map axis events', function() {
      var mappings = new ControllerMappings();
      mappings.setMappedEvent(TEST_AXIS_EVENT_POS, TEST_EVENT_TYPE_1);

      var type = mappings.getMappedEvent(TEST_AXIS_EVENT_POS);
      assert.equal(type, TEST_EVENT_TYPE_1);
    });

    it('should treat positive and negative axis events differently',
       function() {
      var mappings = new ControllerMappings();
      mappings.setMappedEvent(TEST_AXIS_EVENT_POS, TEST_EVENT_TYPE_1);
      mappings.setMappedEvent(TEST_AXIS_EVENT_NEG, TEST_EVENT_TYPE_2);

      var type1 = mappings.getMappedEvent(TEST_AXIS_EVENT_POS);
      assert.equal(type1, TEST_EVENT_TYPE_1);

      var type2 = mappings.getMappedEvent(TEST_AXIS_EVENT_NEG);
      assert.equal(type2, TEST_EVENT_TYPE_2);
    });
  });

  describe('#getMappedEvent', function() {
    it('should return the mapping for an event', function() {
      var mappings = new ControllerMappings();
      mappings.setMappedEvent(TEST_BUTTON_EVENT, TEST_EVENT_TYPE_1);

      var type = mappings.getMappedEvent(TEST_BUTTON_EVENT);
      assert.equal(type, TEST_EVENT_TYPE_1);
    });

    it('should return undefined when no event is mapped', function() {
      var mappings = new ControllerMappings();
      var type = mappings.getMappedEvent(TEST_BUTTON_EVENT);
      assert.equal(undefined, type);
    });
  });

  describe('#hasMappedEvent', function() {
    it('should return true if an event is mapped', function() {
      var mappings = new ControllerMappings();
      mappings.setMappedEvent(TEST_BUTTON_EVENT, TEST_EVENT_TYPE_1);

      assert.equal(mappings.hasMappedEvent(TEST_BUTTON_EVENT), true);
      assert.equal(mappings.hasMappedEvent(TEST_AXIS_EVENT_NEG), false);
    });

    it('should return false if no event is mapped', function() {
      var mappings = new ControllerMappings();
      assert.equal(mappings.hasMappedEvent(TEST_BUTTON_EVENT), false);
    });
  });

  describe('#clearMappings', function() {
    it('should reset all mappings', function() {
      var mappings = new ControllerMappings();
      mappings.setMappedEvent(TEST_BUTTON_EVENT, TEST_EVENT_TYPE_1);
      assert.equal(mappings.hasMappedEvent(TEST_BUTTON_EVENT), true);
 
      mappings.clearMappings();
      assert.equal(mappings.hasMappedEvent(TEST_BUTTON_EVENT), false);
    });
  });
});
