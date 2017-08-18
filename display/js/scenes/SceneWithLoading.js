var SceneWithLoading = function() {
  var that = new Scene();

  // Fields
  var progress = 0;
  var progress_callback = undefined;

  // Public functions
  that.setProgress = function(new_progress) {
    progress = new_progress;

    if(progress_callback != undefined) {
      progress_callback(progress);
    }
  };

  that.onProgress = function(callback) {
    progress_callback = callback;
  };

  that.getProgress = function() {
    return progress;
  };

  return that;
};
