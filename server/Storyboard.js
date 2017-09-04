var SimulationThread = require('./SimulationThread.js');

var Storyboard = function(player, simulation_thread) {
  var that = {};

  // Private fields
  var scenes = [];
  var current_scene = undefined;
  var index = 0;
  var game_data = {};

  // Private methods
  function createSceneEvent() {
    return {
      'event_type': 'scene',
      'name': current_scene.getName()
    };
  };

  function setup() {
    game_data.simulation_thread = simulation_thread;

    game_data.player = player;
    player.onConsumerAdded(function(client_id) {
      if(index < scenes.length) {
        player.sendEventToConsumer(createSceneEvent(), client_id);
      }

      next();
    });
  };

  function next() {
    current_scene.stop();

    index += 1;
    if(index < scenes.length) {
      loadScene();
    }
  };

  function loadScene() {
    var SceneConstructor = scenes[index];
    current_scene = new SceneConstructor(game_data);

    current_scene.onNext(next);
    player.sendEventToConsumers(createSceneEvent());

    current_scene.start();
  };

  // Public methods
  that.addScene = function(new_scene) {
    scenes.push(new_scene);
  };

  that.start = function() {
    loadScene();
  };

  setup();

  return that;
};

module.exports = Storyboard;
