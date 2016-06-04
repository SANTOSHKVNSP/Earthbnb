var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var PropertiesStore = new Store(AppDispatcher);

var _properties = {};

PropertiesStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "PROPERTIES_RECEIVED":
      this.__emitChange();
      break;
  }
};

module.exports = PropertiesStore;
