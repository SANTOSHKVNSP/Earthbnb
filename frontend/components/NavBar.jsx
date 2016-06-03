var additionalErrorHeight = 21;

var React = require('react');
var Modal = require('react-modal');

var SignUpForm = require('./SignUpForm.jsx');
var LogInForm = require('./LogInForm.jsx');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');
var ErrorsStore = require('../stores/ErrorsStore.js');

var ModalStyles = require('./ModalStyles.js');

var NavBar = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function() {
    return({
      user: "",
      modalOpen: false,
      whichModal: "",
      numberOfErrors: 0,
      userImage: ""
    });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.getUser);
    this.errorsListener = ErrorsStore.addListener(this.getNumberOfErrors);
    ClientActions.fetchUser();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  getUser: function () {
    console.log("getUser triggered");
    var user = UserStore.user();
    this.setState({
      user: user
    });
    if (user) {
      console.log("user: " + user.name);
      console.log("userImage: " + user.image_url);
      this.setState({userImage: user.image_url});
    } else {
      console.log("user: none");
    }
  },
  getNumberOfErrors: function () {
    this.setState({numberOfErrors: ErrorsStore.all().length});
  },

  handleModalOpen: function (which, width) {
    this.setState({modalOpen: true, whichModal: which, modalWidth: width});
  },
  handleModalClose: function () {
    this.setState({modalOpen: false});
    ClientActions.clearErrors();
  },

  handleEditProfileClick: function () {
    this.context.router.push("/user/edit");
  },
  handleYourListingsClick: function () {
    this.context.router.push("/user/listings");
  },
  handleYourTripsClick: function () {
    this.context.router.push("/user/trips");
  },
  handleLogout: function (event) {
    ClientActions.logoutUser();
    this.setState({modalOpen: false});
    this.context.router.push("/");
  },

  render: function () {
    console.log("nav bar rendered");

    var component;
    if (this.state.whichModal === "Log In") {
      component = <LogInForm />;
      ModalStyles.content.width = '452px';
      ModalStyles.content.height = (258 + (additionalErrorHeight * this.state.numberOfErrors)) + 'px';
    } else {
      component = <SignUpForm />;
      ModalStyles.content.width = '452px';
      ModalStyles.content.height = (284 + (additionalErrorHeight * this.state.numberOfErrors)) + 'px';
    }

    if (this.state.user) {
      return(
        <div className={"nav-bar"}>
          <div id="user-button" className="nav-bar-button">
            {this.state.user.name}
            <img src={this.state.userImage} />
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
          <div onClick={this.handleModalOpen.bind(this, "Log In")} id="login-button" className="nav-bar-button">Log In</div>
          <div onClick={this.handleModalOpen.bind(this, "Sign Up")} id="signup-button" className="nav-bar-button">Sign Up</div>

          <Modal isOpen={this.state.modalOpen} onRequestClose={this.handleModalClose} style={ModalStyles}>
            {component}
          </Modal>

        </div>
      );
    }
  }
});

module.exports = NavBar;
