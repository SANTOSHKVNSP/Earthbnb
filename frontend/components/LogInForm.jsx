var React = require('react');

var ClientActions = require('../actions/ClientActions.js');
var ErrorsStore = require('../stores/ErrorsStore.js');

var LogInForm = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function() {
    return({
      email: "",
      password: "",
      emailErrors: [],
      passwordErrors: []
    });
  },

  componentDidMount: function () {
    this.errorsListener = ErrorsStore.addListener(this.handleErrors);
  },

  componentWillUnmount: function () {
    this.errorsListener.remove();
  },

  handleErrors: function() {
    this.setState({
      emailErrors: ErrorsStore.emailErrors(),
      passwordErrors: ErrorsStore.passwordErrors()
    });
  },

  emailChanged: function(event) {
    this.setState({
      email: event.target.value
    });
  },

  passwordChanged: function(event) {
    this.setState({
      password: event.target.value
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    ClientActions.createSession(
      {email: this.state.email, password: this.state.password},
      this.redirectAfterLogin
    );
    ClientActions.clearErrors();
  },

  handleGuestLogIn: function(event) {
    event.preventDefault();
    ClientActions.createSession(
      {email: "guest@guest.com", password: "password"},
      this.redirectAfterLogin
    );
    ClientActions.clearErrors();
  },

  redirectAfterLogin: function () {
    this.context.router.push("/");
  },

  renderEmailErrors: function() {
    return this.state.emailErrors.map(function(emailError, index) {
      return(<div key={index} className="error-message">{emailError}</div>);
    });
  },
  renderPasswordErrors: function() {
    return this.state.passwordErrors.map(function(passwordError, index) {
      return(<div key={index} className="error-message">{passwordError}</div>);
    });
  },

  render: function () {

    var emailClass = this.state.emailErrors.length > 0 ? "errors" : "no-errors";
    var passwordClass = this.state.passwordErrors.length > 0 ? "errors" : "no-errors";

    return(
      <div className="sign-up-form">
        Log in<br />

        {this.renderEmailErrors()}
        <input type="text" className={emailClass} placeholder="Email address" value={this.state.email} onChange={this.emailChanged}/><br />

        {this.renderPasswordErrors()}
        <input type="password" className={passwordClass} placeholder="Password" value={this.state.password} onChange={this.passwordChanged}/><br />

        <button onClick={this.handleSubmit}>Log In</button>
        <button onClick={this.handleGuestLogIn}>Guest Log In</button>
      </div>
    );
  }
});

module.exports = LogInForm;
