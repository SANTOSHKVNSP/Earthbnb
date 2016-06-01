var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');

var NavBar = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function() {
    return({
      user: ""
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
    this.setState({
      user: UserStore.user()
    });
  },

  handleLogout: function (event) {
    ClientActions.logoutUser();
  },

  handleLoginClick: function () {
    this.context.router.push({
      pathname: "login"
    });
  },
  handleSignUpClick: function () {
    this.context.router.push({
      pathname: "signup"
    });
  },

  render: function () {
    if (this.state.user) {
      return(
        <div className={"nav-bar"}>
          <button onClick={this.handleLogout}>Log Out</button>
          <div id="user-button" className="nav-bar-button">
            {this.state.user.name}
            <ul className="user-menu">
              <li>Edit Profile</li>
              <li>Your Listings</li>
              <li>Your Trips</li>
              <li onClick={this.handleLogout}>Log Out</li>
            </ul>
          </div>
        </div>
      );
    } else {
      return(
        <div className={"nav-bar"}>
          Not logged in
          <div onClick={this.handleLoginClick} id="login-button" className="nav-bar-button">Log In</div>
          <div onClick={this.handleSignUpClick} id="signup-button" className="nav-bar-button">Sign Up</div>
        </div>
      );
    }
  }
});

module.exports = NavBar;
