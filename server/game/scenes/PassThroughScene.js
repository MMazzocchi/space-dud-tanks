var PassThroughScene = async function(player) {
   return new Promise(function(resolve, reject) {
     player.on('controller_event', player.sendEventToConsumers);
   });
};

module.exports = PassThroughScene;
