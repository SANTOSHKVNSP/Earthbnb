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
      users: response
    });
  },
  receivePropertyTypes: function (response) {
    AppDispatcher.dispatch({
      actionType: "PROPERTY_TYPES_RECEIVED",
      propertyTypes: response
    });
  },
  receiveProperties: function (response) {
    AppDispatcher.dispatch({
      actionType: "PROPERTIES_RECEIVED",
      properties: response
    });
  },
  receiveProperty: function (response) {
    AppDispatcher.dispatch({
      actionType: "PROPERTY_RECEIVED",
      property: response.property
    });
  },
  removeProperty: function (response) {
    AppDispatcher.dispatch({
      actionType: "PROPERTY_REMOVED",
      property: response
    });
  },
  receiveReservations: function (response) {
    AppDispatcher.dispatch({
      actionType: "RESERVATIONS_RECEIVED",
      reservations: response
    });
  },
  removeReservation: function (response) {
    AppDispatcher.dispatch({
      actionType: "RESERVATION_REMOVED",
      reservation: response
    });
  },
};

module.exports = ServerActions;
