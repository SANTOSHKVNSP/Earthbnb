var React = require('react');
var ClientActions = require('../actions/ClientActions.js');

var SignUpForm = React.createClass({

  getInitialState: function() {
    return({
      email: "",
      password: "",
      name: "",
      species: ""
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

  handleSubmit: function(event) {
    event.preventDefault();
    ClientActions.createUser({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      species: this.state.species
    });
  },

  render: function () {
    return(
      <div className={"sign-up-form"}>
        Sign Up<br />
        <input type="text" placeholder="Name" value={this.state.name} onChange={this.nameChanged}/><br />
        <input type="text" placeholder="Species" value={this.state.species} onChange={this.speciesChanged}/><br />
        <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailChanged}/><br />
        <input type="text" placeholder="Password" value={this.state.password} onChange={this.passwordChanged}/><br />
        <button onClick={this.handleSubmit}>Sign Up</button>
      </div>
    );
  }
});

module.exports = SignUpForm;
