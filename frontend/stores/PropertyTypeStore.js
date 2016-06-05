var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var PropertyTypesStore = new Store(AppDispatcher);

var _propertyTypes = [];

PropertyTypesStore.setPropertyTypes = function (propertyTypes) {
  _propertyTypes = propertyTypes;
};

PropertyTypesStore.all = function () {
  return _propertyTypes;
};

PropertyTypesStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "PROPERTY_TYPES_RECEIVED":
      this.setPropertyTypes(payload.propertyTypes);
      this.__emitChange();
      break;
  }
};

module.exports = PropertyTypesStore;
