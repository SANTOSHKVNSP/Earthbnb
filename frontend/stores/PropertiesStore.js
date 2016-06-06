var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var PropertiesStore = new Store(AppDispatcher);

var _properties = {};

PropertiesStore.resetProperties = function() {
  _properties = {};
};

PropertiesStore.all = function() {
  return Object.keys(_properties).map(function (id) {
    return(_properties[id]);
  });
};

PropertiesStore.setProperties = function(properties) {
  this.resetProperties();
  properties.forEach(function(property) {
    _properties[property.id] = property;
  });
};

PropertiesStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "PROPERTIES_RECEIVED":
      this.setProperties(payload.properties);
      this.__emitChange();
      break;
  }
};

module.exports = PropertiesStore;
