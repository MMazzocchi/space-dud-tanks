var GameClient = require('./GameClient.js');

$(function() {
  var game_client = new GameClient();

  document.getElementById('submit_player_id').onclick = function(e) {
    var player_id = document.getElementById('player_id').value;

    game_client.useDisplayConnection(player_id).then(function() {
      console.log("It worked!!!");

    }).catch(function() {
      console.log("It didn't work :(");
    });
  };
});
