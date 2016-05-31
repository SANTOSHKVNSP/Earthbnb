var ServerActions = require('../actions/serverActions.js');

module.exports = {
  createUser: function(user) {
    $.ajax({
      url: 'api/users',
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
  }
};
