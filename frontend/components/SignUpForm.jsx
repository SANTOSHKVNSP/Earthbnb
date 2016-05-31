var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var ErrorsStore = require('../stores/ErrorsStore.js');

var SignUpForm = React.createClass({

  getInitialState: function() {
    return({
      email: "",
      password: "",
      name: "",
      species: "",
      errors: "",
      textboxClass: "no-errors"
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
      errors: ErrorsStore.all(),
      textboxClass: "errors"
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
    console.log("!");
    this.setState({
      species: event.target.value
    });
  },

  handleSubmit: function(event) {
    event.preventDefault();
    ClientActions.createUser({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      species: this.state.species
    });
  },

  renderNameError: function() {
    if(this.state.errors !== ""){
      return(<div>there are errors!</div>);
    }
  },

  render: function () {
    return(
      <div className={"sign-up-form"}>
        Sign Up<br />

        {this.renderNameError()}

        <input type="text" className={this.state.textboxClass} placeholder="Name" value={this.state.name} onChange={this.nameChanged}/><br />

        <select className={this.state.textboxClass} onChange={this.speciesChanged}>
          <option value="">I am a...</option>
          <option value="Martian">Martian</option>
          <option value="Klingon">Klingon</option>
        </select><br />

        <input type="text" className={this.state.textboxClass} placeholder="Email" value={this.state.email} onChange={this.emailChanged}/><br />
        <input type="text" className={this.state.textboxClass} placeholder="Password" value={this.state.password} onChange={this.passwordChanged}/><br />
        <button onClick={this.handleSubmit}>Sign Up</button>
      </div>
    );
  }
});

module.exports = SignUpForm;
