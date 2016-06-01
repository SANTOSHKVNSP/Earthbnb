var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');

var NavBar = React.createClass({

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

  render: function () {
    if (this.state.user) {
      return(
        <div className={"nav-bar"}>
          Logged in as {this.state.user.name} <br />
          <button onClick={this.handleLogout}>Log Out</button>
        </div>
      );
    } else {
      return(
        <div className={"nav-bar"}>
          Not logged in
          <div className="nav-bar-button">Log In</div>
          <div className="nav-bar-button">Sign Up</div>
        </div>
      );
    }
  }
});

module.exports = NavBar;
