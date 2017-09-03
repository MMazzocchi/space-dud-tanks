var Scene = require('./Scene.js');
var color_list = require('../ColorList.js');

var TankSelectScene = function(game_data) {
  var that = new Scene('tank_select');

  // Fields
  var controller = game_data.controller;
  var player = game_data.player;

  // Private methods
  function setColor(color) {
    player.sendEventToConsumers({
      'event_type': 'tank_color',
      'color': color
    });
  };

  // Public methods
  that.start = function() {
    // Set up controller events
    controller.on('left', function(value) {
      if(value === 1) {
        setColor(color_list.getPreviousColor());        
      }
    });

    controller.on('right', function(value) {
      if(value === 1) {
        setColor(color_list.getNextColor());        
      }
    });

    controller.on('start', function(value) {
      if(value === 1) {
        game_data.tank_color = color_list.getCurrentColor();
        that.next();
      }
    });
  };

  return that;
};

module.exports = TankSelectScene;
