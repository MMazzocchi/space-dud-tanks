$(function() {
  function setupGame(client) {
    var game = new Game(window.innerWidth, window.innerHeight, client);

    window.addEventListener( 'resize', function() {
      game.setSize(window.innerWidth, window.innerHeight);
    }, false );

    document.body.innerHTML = "";
    document.body.appendChild(game.getRenderer().domElement);
  }

  function start() {
    var client = new DisplayConnection();
    
    document.getElementById('submit_player_id').onclick = function(e) {
        var player_id = document.getElementById('player_id').value;
        client.selectPlayer(player_id, function(valid) {
          if(valid) {
            setupGame(client);
          }
        });
    };
  }

  start();
});
