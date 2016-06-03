var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var UserStore = new Store(AppDispatcher);

var _user = null;

UserStore.user = function() {
  return _user;
};

UserStore.setUser = function(serverResponse) {
  _user = serverResponse.user;
};

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "USER_RECEIVED":
      this.setUser(payload.user);
      this.__emitChange();
      break;
    case "USER_LOGGED_OUT":
      _user = null;
      this.__emitChange();
      break;
  }
};

module.exports = UserStore;
