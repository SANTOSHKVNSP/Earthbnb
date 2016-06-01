var ServerActions = require('../actions/ServerActions.js');

module.exports = {
  createUser: function(user) {
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
        console.log("success!");
      },
      error: function (response) {
        ServerActions.receiveErrors(response);
      }
    });
  },
  createSession: function(loginInfo) {
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
        console.log("logged out!");
        ServerActions.logoutUser();
      }
    });
  }
};
