var ApiUtil = require('../util/apiUtil.js');
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var ClientActions = {
  createUser: ApiUtil.createUser,
  createSession: ApiUtil.createSession,
  fetchUser: ApiUtil.fetchUser,
  logoutUser: ApiUtil.logoutUser,

  clearErrors: function () {
    AppDispatcher.dispatch({
      actionType: "CLEAR_ERRORS"
    });
  }
};

module.exports = ClientActions;
