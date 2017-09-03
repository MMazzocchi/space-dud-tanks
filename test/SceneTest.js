var assert = require('assert');
var Scene = require('../server/scenes/Scene.js');

describe('Scene', function() {
  describe('#onNext', function() {
    it('should set the next callback', function(done) {
      var scene = new Scene();
      scene.onNext(function() {
        done();
      });

      scene.next();
    });
  });

  describe('#next', function() {
    it('should call the next callback', function(done) {
      var scene = new Scene();
      scene.onNext(function() {
        done();
      });

      scene.next();
    });
  });

  describe('#start', function() {
    it('should throw an error', function(done) {
      var scene = new Scene();
      try {
        scene.start();
      } catch(e) {
        done();
      }
    });
  });


});
