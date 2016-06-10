var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var ErrorsStore = require('../stores/ErrorsStore.js');

var species1 = "Martian";
var species2 = "Neptunian";
var species3 = "Alpha Centaurian";
var species4 = "Teapot";
var species5 = "Don't Label Me";

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
      passwordErrors: [],
      showingDropDown: false
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
  speciesChanged: function(event) {
    this.setState({
      species: event.target.value
    });
  },

  handleSpeciesBoxClick: function(event) {
    if (this.state.showingDropDown) {
      this.setState({showingDropDown: false});
    } else {
      this.setState({showingDropDown: true});
    }
  },
  handleSelect1: function(event) {
    this.setState({species: species1});
  },
  handleSelect2: function(event) {
    this.setState({species: species2});
  },
  handleSelect3: function(event) {
    this.setState({species: species3});
  },
  handleSelect4: function(event) {
    this.setState({species: species4});
  },
  handleSelect5: function(event) {
    this.setState({species: species5});
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
    var dropdownClass = this.state.showingDropDown ? "drop-down-visible" : "drop-down-invisible";
    var speciesBoxText = this.state.species ? this.state.species : "I am a...";
    var speciesTextClass = this.state.species ? "blackText" : "grayText";
    var speciesClasses = speciesClass + " " + speciesTextClass;

    return(
      <div className={"sign-up-form"}>
        Sign up<br />

        {this.renderNameErrors()}
        <input type="text" className={nameClass} placeholder="Name" value={this.state.name} onChange={this.nameChanged}/><br />

        {this.renderSpeciesErrors()}
        <div id="select-box" className={speciesClasses} onClick={this.handleSpeciesBoxClick}>
          {speciesBoxText}
          <img src={window.dropDownButtonUrl} />
          <ul id="select-box-dropdown" className={dropdownClass}>
            <li onClick={this.handleSelect1}>{species1}</li>
            <li onClick={this.handleSelect2}>{species2}</li>
            <li onClick={this.handleSelect3}>{species3}</li>
            <li onClick={this.handleSelect4}>{species4}</li>
            <li onClick={this.handleSelect5}>{species5}</li>
          </ul>
        </div><br />

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
