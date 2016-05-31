var AppDispatcher = require('../dispatcher/dispatcher.js');

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
  }
};

module.exports = ServerActions;
