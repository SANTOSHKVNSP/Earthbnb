var ApiUtil = require('../util/apiUtil.js');
var AppDispatcher = require('../dispatcher/Dispatcher.js');

var ClientActions = {
  createUser: ApiUtil.createUser,
  createSession: ApiUtil.createSession,
  fetchUser: ApiUtil.fetchUser,
  logoutUser: ApiUtil.logoutUser,
  updateUser: ApiUtil.updateUser,
  fetchUsers: ApiUtil.fetchUsers,

  fetchPropertyImages: ApiUtil.fetchPropertyImages,
  createProperty: ApiUtil.createProperty,
  fetchUserProperties: ApiUtil.fetchUserProperties,
  fetchBoundsProperties: ApiUtil.fetchBoundsProperties,
  fetchProperty: ApiUtil.fetchProperty,
  deleteProperty: ApiUtil.deleteProperty,
  updateProperty: ApiUtil.updateProperty,

  fetchPropertyTypes: ApiUtil.fetchPropertyTypes,

  createReservation: ApiUtil.createReservation,

  clearErrors: function () {
    AppDispatcher.dispatch({
      actionType: "CLEAR_ERRORS"
    });
  }
};

module.exports = ClientActions;
