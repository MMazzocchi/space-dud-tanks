var TankGameClient = require('./TankGameClient.js');

$(function() {
  var game_client = new TankGameClient($('body')[0], false);

  document.getElementById('submit_player_id').onclick = function(e) {
    var player_id = document.getElementById('player_id').value;

    game_client.useDisplayConnection(player_id).then(function() {
      $('#player-id-form')[0].style.display = "none";
      console.log("It worked!!!");

    }).catch(function(e) {
      console.log("It didn't work :(");
      console.log(e);
    });
  };
});
