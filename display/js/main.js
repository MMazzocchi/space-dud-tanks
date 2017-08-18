$(function() {
  function toggleFullScreen() {

    var doc = window.document;
    var docEl = doc.documentElement;
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
 
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  };

  function setupGame(client) {
    var game = new Game(window.innerWidth, window.innerHeight, client);

    window.addEventListener( 'resize', function() {
      game.setSize(window.innerWidth, window.innerHeight);
    }, false );

    document.body.innerHTML = "";
    var domElement = game.getRenderer().domElement;
    domElement.ondblclick = toggleFullScreen;
    document.body.appendChild(domElement);
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
