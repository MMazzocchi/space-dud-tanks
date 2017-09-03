var ColorList = function() {
  var that = {};

  // Fields
  const colors = [ 0xAA0000, 0x00AA00, 0x0000AA, 0xAAAA00, 0x00AAAA, 0xAA00AA,
                   0xAAAAAA, 0x222222 ];
  var index = 0;

  // Public functions
  that.getCurrentColor = function() {
    return colors[index];
  };

  that.getNextColor = function() {
    index += 1;
    if(index >= colors.length) {
      index = 0;
    }

    return colors[index];
  };

  that.getPreviousColor = function() {
    index -= 1;
    if(index < 0) {
      index = colors.length - 1;
    }

    return colors[index];
  };

  return that;
}();

module.exports = ColorList;
