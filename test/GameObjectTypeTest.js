var assert = require('assert');
var GameObjectType = require('../server/objects/GameObjectType.js');

describe('GameObjectType', function() {
  describe('#Constructor', function() {
    it('should create a constructor with the appropriate methods', function() {
      var MyObject = new GameObjectType(["x", "y", "z"]);
      var thing = new MyObject(1, 2, 3);

      assert.equal(thing.getX(), 1);
      assert.equal(thing.getY(), 2);
      assert.equal(thing.getZ(), 3);

      thing.setX(4);
      thing.setY(5);
      thing.setZ(6);

      assert.equal(thing.getX(), 4);
      assert.equal(thing.getY(), 5);
      assert.equal(thing.getZ(), 6);
    });
  });
});
 
