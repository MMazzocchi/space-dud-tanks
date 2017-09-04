var assert = require('assert');
var GameObjectType = require('../server/objects/GameObjectType.js');

describe('GameObjectType', function() {
  describe('#Constructor', function() {
    it('should create a constructor with the appropriate methods', function() {
      var MyObject = new GameObjectType(["x", "y", "z"]);
      var thing = new MyObject();

      thing.setX(1);
      thing.setY(2);
      thing.setZ(3);

      assert.equal(thing.getX(), 1);
      assert.equal(thing.getY(), 2);
      assert.equal(thing.getZ(), 3);
    });
  });
});
 
