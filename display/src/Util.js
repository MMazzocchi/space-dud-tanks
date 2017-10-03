var Util = function() {
  var that = {};

  that.interpolate = function(past_value,   past_time,
                              future_value, future_time,
                              now) {
    if(now < future_time) {
      var slope = ((future_value - past_value) / (future_time - past_time));
      var run = now - past_time;
      var now_value = past_value + (slope * run);

      return now_value;
    } else {

      return future_value;
    }
  };

  return that;
}();

module.exports = Util;
