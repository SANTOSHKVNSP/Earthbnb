var AppDispatcher = require('../dispatcher/Dispatcher.js');

var ServerActions = {
  receiveErrors: function (response) {
    var errorsArray = response.responseText
    .replace(/\[/g, "")
    .replace(/\]/g, "")
    .replace(/"/g, "")
    .split(",");
    AppDispatcher.dispatch({
      actionType: "ERRORS_RECEIVED",
      errors: errorsArray
    });
  },
  receiveLoginError: function (response) {
    AppDispatcher.dispatch({
      actionType: "ERRORS_RECEIVED",
      errors: [JSON.parse(response.responseText).message]
    });
  },
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: "USER_RECEIVED",
      user: user
    });
  },
  logoutUser: function () {
    AppDispatcher.dispatch({
      actionType: "USER_LOGGED_OUT"
    });
  },
  receiveUsers: function (response) {
    AppDispatcher.dispatch({
      actionType: "USERS_RECEIVED",
      users: response.users
    });
  },
};

module.exports = ServerActions;
