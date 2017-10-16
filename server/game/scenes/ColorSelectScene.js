var setupScene = require('./Scene.js');

var ColorSelectScene = function(player, controller) {

  const COLORS = [ 0xAA0000, 0x00AA00, 0x0000AA, 0xAAAA00, 0x00AAAA, 0xAA00AA,
                   0xAAAAAA, 0x222222 ];
  var index = 0;

  function sendColor() {
    player.sendEventToConsumers({
      'event_type': 'tank_color',
      'color': COLORS[index]
    });
  };

  function nextColor(value) {
    if(value === 1) {
      index = (index + 1) % COLORS.length;

      sendColor();
    }
  };

  function prevColor(value) {
    if(value === 1) {
      if(index === 0) {
        index = COLORS.length -1;
      } else {
        index -= 1;
      }

      sendColor();
    }
  };

  function start() {
    controller.on('left', prevColor);
    controller.on('right', nextColor);

    return new Promise(function(resolve, reject) {
      controller.once('start', function() {
        controller.removeListener('left', prevColor);
        controller.removeListener('right', nextColor);

        resolve();
      });
    });
  };

  return setupScene('color_select', player).then(start);
};

module.exports = ColorSelectScene;
