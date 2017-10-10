var GameClient = require('./GameClient.js');

var TankGameClient = function() {
  var that = new GameClient();

  that.connectionReady = function(connection) {
    console.log("Connection ready!!");
    connection.on('event', function(data) {
      console.log(data);
    });
  };

  return that;
};

module.exports = TankGameClient;
