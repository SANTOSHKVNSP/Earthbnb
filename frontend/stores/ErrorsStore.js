var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var ErrorsStore = new Store(AppDispatcher);

var _errors = [];

ErrorsStore.resetErrors = function(errors) {
  _errors = errors;
};

ErrorsStore.all = function() {
  return _errors;
};

ErrorsStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "ERRORS_RECEIVED":
      this.resetErrors(payload.errors);
      break;
  }
  this.__emitChange();
};

module.exports = ErrorsStore;
