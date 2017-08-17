var LoadingScene = function(game, controller, width, height) {
  var that = new Scene(width, height);

  // Fields
  var controller = new Controller(client);
  var camera = that.getCamera();
  var scene = that.getScene();
  var progress = 0;
  var on_load = undefined;

  // Public functions
  that.onLoad = function(callback) {
    on_load = callback
  };

  that.setProgress = function(progress) {
    console.log(progress);

    if(on_load !== undefined) {
      on_load(progress);
    }
  };

  return left;
};
