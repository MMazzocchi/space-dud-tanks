var Storyboard = function(client, game) {
  var that = {};

  // Fields
  var scenes = {};

  // Private methods
  function loadScene(name) {
    if(scenes[name] !== undefined) {
      var SceneConstructor = scenes[name];
      var scene = new SceneConstructor(game, client);
      game.setScene(scene);
    }
  };

  function setup() {
    client.onEventType("scene", function(data) {
      loadScene(data.name);
    });
  };

  // Public methods
  that.registerScene = function(name, scene) {
    scenes[name] = scene;
  };

  setup();

  return that;
};
