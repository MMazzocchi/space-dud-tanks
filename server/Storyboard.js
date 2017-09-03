var Storyboard = function(player) {
  var that = {};

  // Private fields
  var scenes = [];
  var index = 0;

  // Private methods
  function createSceneEvent() {
    var scene = scenes[index];

    // TODO: Make an official event type
    return {
      'event_type': 'scene',
      'name': scene.getName()
    };
  };

  function setup() {
    player.onConsumerAdded(function(client_id) {
      if(index < scenes.length) {
        player.sendEventToConsumer(createSceneEvent(), client_id);
      }

      next();
    });
  };

  function next() {
    index += 1;
    if(index < scenes.length) {
      loadScene();
    }
  };

  function loadScene() {
    var scene = scenes[index];
    player.sendEventToConsumers(createSceneEvent());
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

  setup();

  return that;
};

module.exports = Storyboard;
