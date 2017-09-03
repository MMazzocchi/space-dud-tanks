var assert = require('assert');
var Storyboard = require('../server/Storyboard.js');
var Scene = require('../server/Scene.js');
var TestScene = require('./TestScene.js');
var DummyPlayer = require('./DummyPlayer');

describe('Storyboard', function() {
  describe('#addScene', function() {
    it('should add a scene to the end of the storyboard', function(done) {
      var player = new DummyPlayer();
      var storyboard = new Storyboard(player);

      var test_scene_1 = new TestScene();
      test_scene_1.onStart(test_scene_1.next);
      storyboard.addScene(test_scene_1);

      var test_scene_2 = new TestScene();
      test_scene_2.onStart(done);
      storyboard.addScene(test_scene_2);

      storyboard.start();
    });
  });

  describe('#start', function() {
    it('should start the first scene', function(done) {
      var player = new DummyPlayer();
      var storyboard = new Storyboard(player);

      var test_scene = new TestScene();
      test_scene.onStart(done);
      storyboard.addScene(test_scene);

      storyboard.start();
    });
  });
});
