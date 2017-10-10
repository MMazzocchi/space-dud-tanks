var setImmediate = require('timers').setImmediate;

var GameClient = function() {
  var that = {};
  var connection = undefined;

  // Public functions
  that.useDisplayConnection = function(player_id) {

    var client = new DisplayConnection();
    setImmediate(function() {
      client.selectPlayer(player_id);
    });

    return new Promise(function(resolve, reject) {
      client.once('player_chosen', function(valid) {
        if(valid === true) {
          resolve();  

        } else {
          reject();
        }
      });
    });
  };

  that.useJointConnection = function() {
    throw new Error("Not implemented yet!");
  };

  return that;
};

module.exports = GameClient;
