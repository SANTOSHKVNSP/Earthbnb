var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var PropertiesStore = new Store(AppDispatcher);

var _properties = {};

PropertiesStore.resetProperties = function() {
  _properties = {};
};

PropertiesStore.removeProperty = function(property) {
  delete _properties[property.id];
};

PropertiesStore.all = function() {
  return Object.keys(_properties).map(function (id) {
    return(_properties[id]);
  });
};

PropertiesStore.only = function() {
  return(_properties[1]);
};

PropertiesStore.find = function(id) {
  return _properties[id];
};

PropertiesStore.setProperties = function(properties) {
  this.resetProperties();
  properties.forEach(function(property) {
    _properties[property.id] = property;
  });
};

PropertiesStore.setProperty = function(property) {
  this.resetProperties();
  _properties = {1: property};
};

PropertiesStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "PROPERTIES_RECEIVED":
      this.setProperties(payload.properties);
      this.__emitChange();
      break;
    case "PROPERTY_RECEIVED":
      this.setProperty(payload.property);
      this.__emitChange();
      break;
    case "PROPERTY_REMOVED":
      this.removeProperty(payload.property);
      this.__emitChange();
      break;
  }
};

module.exports = PropertiesStore;
