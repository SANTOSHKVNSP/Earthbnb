var AppDispatcher = require('../dispatcher/Dispatcher.js');

var ServerActions = {
  receiveErrors: function (errors) {
    var errorsString = errors.responseText
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/"/g, "");
    AppDispatcher.dispatch({
      actionType: "ERRORS_RECEIVED",
      errors: errorsString.split(",")
    });
  },
  receiveLoginError: function (error) {
    console.log(error);
  }
};

module.exports = ServerActions;
