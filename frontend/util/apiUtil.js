var ServerActions = require('../actions/ServerActions.js');

module.exports = {

  createUser: function(user, callback) {
    $.ajax({
      url: 'api/user',
      type: "POST",
      data: {
        user:{
          name: user.name,
          species: user.species,
          email: user.email,
          password: user.password
        }
      },
      success: function (response) {
        ServerActions.receiveUser(response);
        if (callback) {
          callback();
        }
      },
      error: function (response) {
        ServerActions.receiveErrors(response);
      }
    });
  },

  createSession: function(loginInfo, callback) {
    $.ajax({
      url: 'api/session',
      type: "POST",
      data: {
        user: {
          email: loginInfo.email,
          password: loginInfo.password
        }
      },
      success: function (response) {
        ServerActions.receiveUser(response);
        if (callback) {
          callback();
        }
      },
      error: function (response) {
        ServerActions.receiveLoginError(response);
      }
    });
  },

  fetchUser: function() {
    $.ajax({
      url: 'api/user',
      type: "GET",
      success: function (response) {
        ServerActions.receiveUser(response);
      }
    });
  },

  logoutUser: function() {
    $.ajax({
      url: 'api/session',
      type: "DELETE",
      success: function (response) {
        ServerActions.logoutUser();
      }
    });
  },

  updateUser: function(formData, successCallback, failureCallback) {
    $.ajax({
      url: 'api/user',
      type: "PATCH",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: function (response) {
        ServerActions.receiveUser(response);
        if (successCallback) {
          successCallback();
        }
      },
      error: function (response) {
        ServerActions.receiveErrors(response);
        if (failureCallback) {
          failureCallback();
        }
      }
    });
  },

  fetchUsers: function() {
    $.ajax({
      url: 'api/users',
      type: "GET",
      success: function (response) {
        ServerActions.receiveUsers(response);
      }
    });
  },

  fetchPropertyTypes: function () {
    $.ajax({
      url: 'api/property_types',
      type: "GET",
      success: function (response) {
        ServerActions.receivePropertyTypes(response);
      }
    });
  },

  fetchUserProperties: function (id) {
    $.ajax({
      url: 'api/properties?user=' + id,
      type: "GET",
      success: function (response) {
        ServerActions.receiveProperties(response);
      }
    });
  },

  createProperty: function(formData, successCallback, failureCallback) {
    $.ajax({
      url: 'api/properties',
      type: "POST",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: function (response) {
        if (successCallback) {
          successCallback();
        }
      },
      error: function (response) {
        ServerActions.receiveErrors(response);
        if (failureCallback) {
          failureCallback();
        }
      }
    });
  },

  updateProperty: function(id, formData, successCallback, failureCallback) {
    $.ajax({
      url: 'api/properties/' + id,
      type: "PATCH",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: function (response) {
        ServerActions.receiveUser(response);
        if (successCallback) {
          successCallback();
        }
      },
      error: function (response) {
        ServerActions.receiveErrors(response);
        if (failureCallback) {
          failureCallback();
        }
      }
    });
  },

  fetchProperty: function(id) {
    $.ajax({
      url: 'api/properties/' + id,
      type: "GET",
      success: function (response) {
        ServerActions.receiveProperty(response);
      }
    });
  },

  deleteProperty: function(id) {
    $.ajax({
      url: 'api/properties/' + id,
      type: "DELETE",
      success: function (response) {
        ServerActions.removeProperty(response);
      }
    });
  }

};
