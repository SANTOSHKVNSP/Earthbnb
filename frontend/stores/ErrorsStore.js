var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var ErrorsStore = new Store(AppDispatcher);

var _errors = [];

ErrorsStore.resetErrors = function(errors) {
  _errors = errors;
};

ErrorsStore.all = function() {
  return _errors;
};

ErrorsStore.nameErrors = function () {
  var nameErrors = [];
   if (_errors.indexOf("Name can't be blank") > -1){
     nameErrors.push("Name is required.");
   }
   return nameErrors;
};

ErrorsStore.speciesErrors = function () {
  var speciesErrors = [];
   if (_errors.indexOf("Species can't be blank") > -1){
     speciesErrors.push("Please select your species.");
   }
   return speciesErrors;
};

ErrorsStore.emailErrors = function () {
  var emailErrors = [];
   if (_errors.indexOf("Email can't be blank") > -1){
     emailErrors.push("Email is required.");
   }
   if (_errors.indexOf("Email has already been taken") > -1){
     emailErrors.push("An account with this email already exists.");
   }
   return emailErrors;
};

ErrorsStore.passwordErrors = function () {
  var passwordErrors = [];
   if (_errors.indexOf("Password is too short (minimum is 6 characters)") > -1){
     passwordErrors.push("Password must be at least 6 characters.");
   }
   return passwordErrors;
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
