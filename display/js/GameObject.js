var GameObject = function(model) {
  var that = {};

  // Private fields
  var bounding_box = new THREE.Box3();
  bounding_box.setFromObject(model);

  var step_functions = [];

  // Public functions
  that.resetModel = function() {
    model.position = new THREE.Vector3(0, 0, 0);
    model.rotation = new THREE.Vector3(0, 0, 0);
    model.scale = new THREE.Vector3(1, 1, 1);

    return model;
  };

  that.x = function() {
    return model.position.x;
  };

  that.y = function() {
    return model.position.y;
  };

  that.z = function() {
    return model.position.z;
  };

  that.setX = function(new_x) {
    model.position.x = new_x;
  };

  that.setY = function(new_y) {
    model.position.y = new_y;
  };

  that.setZ = function(new_z) {
    model.position.z = new_z;
  };

  that.getModel = function() {
    return model;
  };

  that.getBoundingBox = function() {
    return bounding_box;
  };

  that.step = function() {
    for(var i=0; i<step_functions.length; i++) {
      step_functions[i]();
    }
  };

  that.addStepFunction = function(step_function) {
    step_functions.push(step_function);
  };

  return that;
};
