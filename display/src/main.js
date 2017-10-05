var Game = require('./Game.js');
m

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

  function setupGame(game) {
    window.addEventListener( 'resize', function() {
      game.setSize(window.innerWidth, window.innerHeight);
    }, false );

//    var domElement = game.getDomElement();
//    document.body.appendChild(domElement);
//    domElement.ondblclick = toggleFullScreen;
  }

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

    document.getElementById('submit_player_id').onclick = function(e) {
      var player_id = document.getElementById('player_id').value;
      client.selectPlayer(player_id);
    };

//        document.body.innerHTML = "";
//        var game = new Game(document.body, window.innerWidth, window.innerHeight, client);
//
//        client.on('player_chosen', function(valid) {
//          if(valid) {
//            setupGame(game);
//          }
//        });
//        client.selectPlayer(player_id);
  }

  start();
});
