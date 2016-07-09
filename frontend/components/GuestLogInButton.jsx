var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');

var GuestLogInButton = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function() {
    return({
      user: null
    });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.getUser);
    ClientActions.fetchUser();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  getUser: function () {
    var user = UserStore.user();
    this.setState({
      user: user
    });
  },

  handleGuestLogIn: function(e) {
    e.preventDefault();
    ClientActions.createSession(
      {email: "guest@guest.com", password: "password"},
      this.redirectAfterLogin
    );
    ClientActions.clearErrors();
  },

  redirectAfterLogin: function () {
    this.context.router.push("/user/trips");
  },

  render: function () {
    if (this.state.user) {
      return(
        <div></div>
      );
    } else {
      return(
        <button onClick={this.handleGuestLogIn}>Guest Log In</button>
      );
    }
  }
});

module.exports = GuestLogInButton;
