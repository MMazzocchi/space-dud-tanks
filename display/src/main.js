var Game = require('./Game.js');

$(function() {
  function start() {
    var client = new DisplayConnection();
    client.on('player_chosen', function(valid) {
      if(valid === true) {
        console.log("Valid player choice!");
        client.onEventType('state', function(data) {
          console.log(data);
        });
      } else {
        console.error("Invalid player choice!");
      }
    });

    client.on('event', function(data) {
      console.log(data);
    });

    document.getElementById('submit_player_id').onclick = function(e) {
      var player_id = document.getElementById('player_id').value;
      client.selectPlayer(player_id);
    };
  }

  start();
});
