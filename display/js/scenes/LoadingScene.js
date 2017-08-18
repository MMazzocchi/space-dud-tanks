var LoadingScene = function(game, next_scene) {
  var that = new Scene();

  // Fields
  var camera = that.getCamera();
  var scene = that.getScene();
  var sprite = new LoadingSprite();

  // Private functions
  function handleProgress(progress) {
    sprite.update(progress);

    if(progress >= 100) {
      game.setScene(next_scene);
    }
  };

  function setup() {
    next_scene.onProgress(handleProgress);

    camera.position.z += 1.2;
    scene.add(sprite.getSprite());
    sprite.update();
  };

  setup();

  return that;
};
