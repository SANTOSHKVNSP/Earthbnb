var React = require('react');
var ClientActions = require('../actions/ClientActions.js');
var UserStore = require('../stores/UserStore.js');

var EditProfile = React.createClass({

  getInitialState: function () {
    return({
      name: "",
      email: "",
      species: "",
      bio: "",
      location: ""
    });
  },

  componentDidMount: function () {
    this.listener = UserStore.addListener(this.getUser);
    ClientActions.fetchUser();
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },

  getUser: function () {
    user = UserStore.user();
    this.setState({
      name: user.name,
      email: user.email,
      species: user.species,
      bio: user.bio,
      location: user.location
    });
  },

  changeName: function (event) {
    this.setState({name: event.target.value});
  },
  changeEmail: function (event) {
    this.setState({email: event.target.value});
  },
  changeSpecies: function (event) {
    this.setState({species: event.target.value});
  },
  changeLocation: function (event) {
    this.setState({location: event.target.value});
  },
  changeBio: function (event) {
    this.setState({bio: event.target.value});
  },

  render: function () {
    return(
      <div className="edit-profile">
        <header className="edit-profile-header">Required</header>
        <form>
          <label>
            Name<input type="text" onChange={this.changeName} value={this.state.name} />
          </label><br />
          <label>
            Email Address<input type="text" onChange={this.changeEmail} value={this.state.email} />
          </label><br />
          <label>
            I Am A<input type="text" onChange={this.changeSpecies} value={this.state.species} />
          </label>
        </form>

        <header className="edit-profile-header">Optional</header>
        <form>
          <label>
            Where You Live<input type="text" onChange={this.changeLocation} value={this.state.location} />
          </label><br />
          <label>
            Describe Yourself<textarea rows="5" cols="20" onChange={this.changeBio} value={this.state.bio} />
          </label><br />
        </form>
        <button>Save</button>
      </div>
    );
  }
});

module.exports = EditProfile;
