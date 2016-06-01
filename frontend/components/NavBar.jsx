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
  handleEditProfileClick: function () {
    this.context.router.push("/users/edit");
  },
  handleYourListingsClick: function () {
    this.context.router.push("/users/edit");
  },
  handleYourTripsClick: function () {
    this.context.router.push("/users/edit");
  },
  handleLogout: function (event) {
    ClientActions.logoutUser();
    this.context.router.push("/");
  },

  render: function () {
    if (this.state.user) {
      return(
        <div className={"nav-bar"}>
          <div id="user-button" className="nav-bar-button">
            {this.state.user.name}
            <ul className="user-menu">
              <li onClick={this.handleEditProfileClick}>Edit Profile</li>
              <li onClick={this.handleYourListingsClick}>Your Listings</li>
              <li onClick={this.handleYourTripsClick}>Your Trips</li>
              <li onClick={this.handleLogout}>Log Out</li>
            </ul>
          </div>
        </div>
      );
    } else {
      return(
        <div className={"nav-bar"}>
          <div onClick={this.handleLoginClick} id="login-button" className="nav-bar-button">Log In</div>
          <div onClick={this.handleSignUpClick} id="signup-button" className="nav-bar-button">Sign Up</div>
        </div>
      );
    }
  }
});

module.exports = NavBar;
