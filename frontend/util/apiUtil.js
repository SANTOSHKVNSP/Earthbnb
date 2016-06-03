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

  updateUser: function(formData, callback) {
    $.ajax({
      url: 'api/user',
      type: "PATCH",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
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

  fetchUsers: function() {
    $.ajax({
      url: 'api/users',
      type: "GET",
      success: function (response) {
        ServerActions.receiveUsers(response);
      }
    });
  }
};
