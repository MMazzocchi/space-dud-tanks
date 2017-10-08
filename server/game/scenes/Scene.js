var setupScene = async function(name, player) {
  function createScenePacket() { 
    var data = {
      'event_type': 'scene',
      'scene': name
    };

    return data;
  };

  function broadcastScenePacket() {
    var data = createScenePacket();
    player.sendEventToConsumers(data);
  };

  function sendScenePacket(consumer_id) {
    setImmediate(function() {
      var data = createScenePacket();
      player.sendEventToConsumer(data, consumer_id);
    });
  };

  setImmediate(broadcastScenePacket);
  player.on('consumer_added', sendScenePacket);

  return Promise.resolve();
};

module.exports = setupScene;
