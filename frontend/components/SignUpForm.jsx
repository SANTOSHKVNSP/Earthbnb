var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var ErrorsStore = require('../stores/ErrorsStore.js');
var SpeciesDropDown = require('./SpeciesDropDown.jsx');

var SignUpForm = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function() {
    return({
      email: "",
      password: "",
      name: "",
      species: "",
      nameErrors: [],
      speciesErrors: [],
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
      nameErrors: ErrorsStore.nameErrors(),
      speciesErrors: ErrorsStore.speciesErrors(),
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
  nameChanged: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  speciesChanged: function(species) {
    this.setState({
      species: species
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    ClientActions.createUser(
      {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        species: this.state.species
      },
      this.redirectAfterSignup
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

  redirectAfterSignup: function () {
    this.context.router.push("/");
  },

  renderNameErrors: function() {
    return this.state.nameErrors.map(function(nameError, index) {
      return(<div key={index} className="error-message">{nameError}</div>);
    });
  },
  renderSpeciesErrors: function() {
    return this.state.speciesErrors.map(function(speciesError, index) {
      return(<div key={index} className="error-message">{speciesError}</div>);
    });
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

    var nameClass = this.state.nameErrors.length > 0 ? "errors" : "no-errors";
    var speciesClass = this.state.speciesErrors.length > 0 ? "errors" : "no-errors";
    var emailClass = this.state.emailErrors.length > 0 ? "errors" : "no-errors";
    var passwordClass = this.state.passwordErrors.length > 0 ? "errors" : "no-errors";

    var speciesBoxText = this.state.species ? this.state.species : "I am a...";
    var speciesTextClass = this.state.species ? "blackText" : "grayText";
    var speciesClasses = speciesClass + " " + speciesTextClass;

    return(
      <div className={"sign-up-form"}>
        Sign up<br />

        {this.renderNameErrors()}
        <input type="text" className={nameClass} placeholder="Name" value={this.state.name} onChange={this.nameChanged}/><br />

        {this.renderSpeciesErrors()}
        <SpeciesDropDown text={speciesBoxText} classes={speciesClasses} callback={this.speciesChanged} /><br />

        {this.renderEmailErrors()}
        <input type="text" className={emailClass} placeholder="Email address" value={this.state.email} onChange={this.emailChanged}/><br />

        {this.renderPasswordErrors()}
        <input type="password" className={passwordClass} placeholder="Password" value={this.state.password} onChange={this.passwordChanged}/><br />

        <button onClick={this.handleSubmit}>Sign Up</button>
        <button onClick={this.handleGuestLogIn}>Guest Log In</button>
      </div>
    );
  }
});

module.exports = SignUpForm;
