var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var UsersStore = new Store(AppDispatcher);

var _users = {};

UsersStore.setUsers = function (users) {
  users.forEach(function(user) {
    _users[user.id] = user;
  });
};

UsersStore.find = function (id) {
  return _users[id];
};

UsersStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "USERS_RECEIVED":
      this.setUsers(payload.users);
      this.__emitChange();
      break;
  }
};

module.exports = UsersStore;
