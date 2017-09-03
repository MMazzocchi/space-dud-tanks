var Storyboard = function() {
  var that = {};

  // Private fields
  var scenes = [];
  var index = 0;

  // Private methods
  function next() {
    index += 1;
    loadScene();
  };

  function loadScene() {
    var scene = scenes[index];
    scene.start();
  };

  // Public methods
  that.addScene = function(new_scene) {
    new_scene.onNext(next);
    scenes.push(new_scene);
  };

  that.start = function() {
    loadScene();
  };

  return that;
};

module.exports = Storyboard;
